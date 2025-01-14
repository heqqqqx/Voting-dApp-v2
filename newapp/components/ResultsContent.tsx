'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingABI from '../../smart-contracts/artifacts/contracts/SecureVoting.sol/Voting.json';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResultsChart } from '@/components/ResultsChart';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface Proposal {
    id: number;
    name: string;
    voteCount: number;
}

export function ResultsContent() {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);
    const [ethAddress, setEthAddress] = useState<string | null>(null);

    const fetchResults = async () => {
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
    };

    useEffect(() => {
        fetchResults();
    }, []);

    if (loading) {
        return <p className="p-4">Loading results...</p>;
    }

    if (proposals.length === 0) {
        return <p className="p-4">No proposals available.</p>;
    }

    const totalVotes = proposals.reduce((sum, proposal) => sum + proposal.voteCount, 0);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Results</h2>
            {ethAddress && (
                <p className="text-center text-sm text-gray-300 mb-4">
                    Connected as: {ethAddress.slice(0, 6)}...{ethAddress.slice(-4)}
                </p>
            )}

            <div className="mb-8">
                <ResultsChart proposals={proposals} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {proposals.map((proposal) => (
                    <motion.div
                        key={proposal.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card className="border border-zinc-700 bg-zinc-800">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-xl mb-3">{proposal.name}</h3>
                                <p className="text-sm text-gray-400">
                                    Votes: {proposal.voteCount} ({((proposal.voteCount / totalVotes) * 100).toFixed(2)}%)
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={fetchResults}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full"
                >
                    Refresh Results
                </Button>
            </div>
        </div>
    );
}
