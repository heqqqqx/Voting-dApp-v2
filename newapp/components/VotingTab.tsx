'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingABI from '../../smart-contracts/artifacts/contracts/SecureVoting.sol/Voting.json';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface Proposal {
  id: number;
  name: string;
  voteCount: number;
}

export function VotingTab() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [ethAddress, setEthAddress] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        if (typeof window.ethereum === 'undefined') {
          alert('MetaMask is not installed!');
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts?.[0] || null;
        setEthAddress(address);

        const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI.abi, provider);

        const proposalCount = await contract.getProposalCount();
        console.log("Proposal count:", proposalCount.toString());

        const fetchedProposals: Proposal[] = [];
        for (let i = 0; i < proposalCount; i++) {
          const proposal = await contract.getProposal(i);
          fetchedProposals.push({
            id: i,
            name: proposal.name,
            voteCount: proposal.voteCount.toNumber(),
          });
        }

        setProposals(fetchedProposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  const handleVote = async () => {
    if (selectedProposal === null) {
      alert("Please select a proposal first.");
      return;
    }

    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      setIsVoting(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, VotingABI.abi, signer);

      const tx = await contractWithSigner.vote(selectedProposal);
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt.transactionHash);

      await refreshProposals(provider);

      alert(`Your vote for proposal #${selectedProposal} has been submitted!`);
    } catch (err) {
      console.error("Error during vote:", err);
      alert("Failed to send vote. Check console for details.");
    } finally {
      setIsVoting(false);
    }
  };

  async function refreshProposals(provider: ethers.providers.Web3Provider) {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI.abi, provider);
      const proposalCount = await contract.getProposalCount();

      const updatedProposals: Proposal[] = [];
      for (let i = 0; i < proposalCount; i++) {
        const proposal = await contract.getProposal(i);
        updatedProposals.push({
          id: i,
          name: proposal.name,
          voteCount: proposal.voteCount.toNumber(),
        });
      }
      setProposals(updatedProposals);
    } catch (error) {
      console.error("Error refreshing proposals:", error);
    }
  }

  if (loading) {
    return <p className="p-4">Loading proposals...</p>;
  }

  if (proposals.length === 0) {
    return <p className="p-4">No proposals available.</p>;
  }

  if (!ethAddress) {
    return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Select a Proposal</h2>
          <p className="mb-2 text-red-600">Please connect your MetaMask wallet to vote.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposals.map((proposal) => (
                <Card key={proposal.id} className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{proposal.name}</h3>
                    <p className="text-sm text-gray-400">Votes: {proposal.voteCount}</p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Select a Proposal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {proposals.map((proposal) => (
              <motion.div
                  key={proposal.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                <Card
                    className={`cursor-pointer transition-all duration-300 ${
                        selectedProposal === proposal.id
                            ? 'border-4 border-purple-500'
                            : 'border border-zinc-700 hover:border-purple-500'
                    }`}
                    onClick={() => {
                      console.log("Click card => proposal.id = ", proposal.id);
                      setSelectedProposal(proposal.id);
                    }}

                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-3">{proposal.name}</h3>
                    <p className="text-sm text-gray-400">Votes: {proposal.voteCount}</p>
                  </CardContent>
                </Card>
              </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
              onClick={handleVote}
              disabled={isVoting || selectedProposal === null}
              className={`px-8 py-3 text-lg font-semibold rounded-full ${
                  isVoting || selectedProposal === null
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
          >
            {isVoting ? 'Voting...' : 'Vote'}
          </Button>
        </div>
      </div>
  );
}

