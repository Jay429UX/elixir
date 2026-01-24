"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CryptoAsset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  cryptoAssets: CryptoAsset[];
}

// Mock wallet addresses for each crypto
const walletAddresses: Record<string, string> = {
  USDC: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
  SOL: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  ETH: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  USDT: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
};

// Network info for each crypto
const networkInfo: Record<string, { network: string; confirmations: number; minDeposit: string }> = {
  USDC: { network: "Ethereum (ERC-20)", confirmations: 12, minDeposit: "10 USDC" },
  SOL: { network: "Solana", confirmations: 32, minDeposit: "0.1 SOL" },
  ETH: { network: "Ethereum", confirmations: 12, minDeposit: "0.01 ETH" },
  BTC: { network: "Bitcoin", confirmations: 3, minDeposit: "0.0001 BTC" },
  USDT: { network: "Ethereum (ERC-20)", confirmations: 12, minDeposit: "10 USDT" },
};

export default function DepositModal({ isOpen, onClose, cryptoAssets }: DepositModalProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyAddress = async () => {
    if (!selectedCrypto) return;
    const address = walletAddresses[selectedCrypto.symbol];
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const handleBack = () => {
    setSelectedCrypto(null);
    setCopied(false);
  };

  const handleClose = () => {
    setSelectedCrypto(null);
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-dicey-card border border-dicey-border rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dicey-border">
          <div className="flex items-center gap-3">
            {selectedCrypto && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-dicey-border rounded-lg transition-colors"
              >
                <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-lg font-semibold text-white">
              {selectedCrypto ? `Deposit ${selectedCrypto.symbol}` : "Deposit"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-dicey-border rounded-lg transition-colors"
          >
            <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {!selectedCrypto ? (
          /* Currency Selection */
          <div className="p-4">
            <p className="text-sm text-gray-400 mb-4">Select the currency you want to deposit</p>
            <div className="space-y-2">
              {cryptoAssets.map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => setSelectedCrypto(crypto)}
                  className="w-full flex items-center justify-between p-4 bg-dicey-dark hover:bg-dicey-border/50 border border-dicey-border rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={crypto.icon} alt={crypto.symbol} className="size-8" />
                    <div className="text-left">
                      <span className="text-white font-medium block">{crypto.symbol}</span>
                      <span className="text-xs text-gray-500">{crypto.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 tabular-nums">{crypto.balance}</span>
                    <svg className="size-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Wallet Address Display */
          <div className="p-4">
            {/* Selected Crypto Info */}
            <div className="flex items-center gap-3 mb-6">
              <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="size-10" />
              <div>
                <span className="text-white font-medium block">{selectedCrypto.name}</span>
                <span className="text-xs text-gray-500">{networkInfo[selectedCrypto.symbol]?.network}</span>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-xl">
                <div className="size-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center px-4">QR Code for {selectedCrypto.symbol} address</span>
                </div>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Deposit Address</label>
              <div className="flex items-center gap-2 p-3 bg-dicey-dark border border-dicey-border rounded-xl">
                <span className="flex-1 text-sm text-white font-mono break-all">
                  {walletAddresses[selectedCrypto.symbol]}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className={cn(
                    "flex-shrink-0 p-2 rounded-lg transition-colors",
                    copied ? "bg-green-500/20 text-green-400" : "bg-dicey-border hover:bg-dicey-border/80 text-gray-400"
                  )}
                >
                  {copied ? (
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Network Info */}
            <div className="space-y-2 p-3 bg-dicey-dark/50 border border-dicey-border rounded-xl">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Network</span>
                <span className="text-white">{networkInfo[selectedCrypto.symbol]?.network}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Confirmations</span>
                <span className="text-white">{networkInfo[selectedCrypto.symbol]?.confirmations}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Minimum Deposit</span>
                <span className="text-white">{networkInfo[selectedCrypto.symbol]?.minDeposit}</span>
              </div>
            </div>

            {/* Warning */}
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-2">
                <svg className="size-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xs text-yellow-200">
                  Only send {selectedCrypto.symbol} to this address. Sending any other asset may result in permanent loss.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
