'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'

export function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [ethAddress, setEthAddress] = useState<string | null>(null);

  function getMetaMaskProvider() {
    const anyWindow = window as any;

    if (anyWindow.ethereum?.providers) {
      const providers = anyWindow.ethereum.providers;
      const metamaskProvider = providers.find((p: any) => p.isMetaMask);
      if (metamaskProvider) {
        return metamaskProvider;
      }
    }

    if (anyWindow.ethereum && anyWindow.ethereum.isMetaMask) {
      return anyWindow.ethereum;
    }

    return null;
  }

  useEffect(() => {
    const updateUserName = () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      setUserName(currentUser.name || null);

      if (currentUser.ethAddress) {
        setEthAddress(currentUser.ethAddress);
      }
    };

    updateUserName();
    window.addEventListener('storage', updateUserName);

    return () => {
      window.removeEventListener('storage', updateUserName);
    };
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem('currentUser');
    setUserName(null);
    setEthAddress(null);

    router.push('/');
  };

  const connectMetaMask = async () => {
    const metamaskProvider = getMetaMaskProvider();
    if (!metamaskProvider) {
      alert('MetaMask is not installed or not detected!');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(metamaskProvider);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setEthAddress(address);

      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.ethAddress = address;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      console.log('Connected MetaMask Address:', address);
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
    }
  };

  return (
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center">
              <Mail className="w-6 h-6 text-purple-500" />
              <Link href="/" className="text-xl font-bold">
                SecureVote
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>



                {userName ? (
                    <>
                      <span className="text-gray-300">Hello, {userName}!</span>

                      {ethAddress ? (
                          <span className="text-gray-300">
                      Connected: {ethAddress.slice(0, 6)}...{ethAddress.slice(-4)}
                    </span>
                      ) : (
                          <Button
                              variant="outline"
                              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all"
                              onClick={connectMetaMask}
                          >
                            Connect Wallet
                          </Button>
                      )}

                      <Link
                          href="/vote"
                          className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
                      >
                        Vote Now
                      </Link>
                      <Button
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          onClick={handleDisconnect}
                      >
                        Disconnect
                      </Button>
                    </>
                ) : (
                    <Button
                        variant="outline"
                        className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all"
                        onClick={() => router.push('/auth')}
                    >
                      Start Voting
                    </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
}