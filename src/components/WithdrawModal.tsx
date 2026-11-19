"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import ModalCloseButton from "./ui/ModalCloseButton";
import { cn } from "@/lib/utils";

interface CryptoAsset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  cryptoAssets: CryptoAsset[];
}

// Network info for each crypto
const networkInfo: Record<string, { network: string; fee: string; minWithdraw: string }> = {
  USDC: { network: "Ethereum (ERC-20)", fee: "5 USDC", minWithdraw: "20 USDC" },
  SOL: { network: "Solana", fee: "0.01 SOL", minWithdraw: "0.5 SOL" },
  ETH: { network: "Ethereum", fee: "0.005 ETH", minWithdraw: "0.05 ETH" },
  BTC: { network: "Bitcoin", fee: "0.0001 BTC", minWithdraw: "0.001 BTC" },
  USDT: { network: "Ethereum (ERC-20)", fee: "5 USDT", minWithdraw: "20 USDT" },
};

export default function WithdrawModal({ isOpen, onClose, cryptoAssets }: WithdrawModalProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleBack = () => {
    setSelectedCrypto(null);
    setWithdrawAddress("");
    setWithdrawAmount("");
  };

  const handleClose = () => {
    setSelectedCrypto(null);
    setWithdrawAddress("");
    setWithdrawAmount("");
    onClose();
  };

  const handleMaxAmount = () => {
    if (selectedCrypto) {
      setWithdrawAmount(selectedCrypto.balance.replace(/,/g, ""));
    }
  };

  const getNumericBalance = (balance: string) => {
    return parseFloat(balance.replace(/,/g, ""));
  };

  const isValidWithdraw = () => {
    if (!selectedCrypto || !withdrawAddress || !withdrawAmount) return false;
    const amount = parseFloat(withdrawAmount);
    const balance = getNumericBalance(selectedCrypto.balance);
    return amount > 0 && amount <= balance && withdrawAddress.length > 10;
  };

  return (
    <ModalShell isOpen={isOpen} onClose={handleClose} labelledBy="withdraw-modal-title">
      {/* Modal */}
      <div className="ui-modal-panel relative my-auto w-full max-w-md shrink-0 overflow-hidden" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            {selectedCrypto && (
              <button
                type="button"
                aria-label="Back to currency list"
                onClick={handleBack}
                className="p-1.5 hover:bg-dicey-border rounded-lg transition-colors"
              >
                <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 id="withdraw-modal-title" className="ui-modal-title text-white">
              {selectedCrypto ? `Withdraw ${selectedCrypto.symbol}` : "Withdraw"}
            </h2>
          </div>
          <ModalCloseButton onClick={handleClose} label="Close withdraw modal" />
        </div>

        {/* Content */}
        {!selectedCrypto ? (
          /* Currency Selection */
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="text-sm text-gray-400 mb-3">Select the currency you want to withdraw</p>
            <div className="space-y-2">
              {cryptoAssets.map((crypto) => (
                <button
                  key={crypto.symbol}
                  type="button"
                  onClick={() => setSelectedCrypto(crypto)}
                  className="w-full flex items-center justify-between p-3 sm:p-3.5 bg-dicey-dark hover:bg-dicey-border/50 rounded-xl transition-colors"
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
          /* Withdraw Form */
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            {/* Selected Crypto Info */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="size-10" />
                <div>
                  <span className="text-white font-medium block">{selectedCrypto.name}</span>
                  <span className="text-xs text-gray-500">{networkInfo[selectedCrypto.symbol]?.network}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Available</span>
                <span className="text-white font-medium tabular-nums">{selectedCrypto.balance} {selectedCrypto.symbol}</span>
              </div>
            </div>

            {/* Withdraw Address */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Withdrawal Address</label>
              <input
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                placeholder={`Enter ${selectedCrypto.symbol} address`}
                className="w-full p-3 bg-dicey-dark rounded-xl text-white placeholder-gray-500 focus:outline-none font-mono text-base sm:text-sm"
              />
            </div>

            {/* Withdraw Amount */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-3 pr-20 bg-dicey-dark rounded-xl text-white placeholder-gray-500 focus:outline-none tabular-nums text-base sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleMaxAmount}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-dicey-border hover:bg-dicey-border/80 rounded-lg text-xs font-medium text-gray-400 hover:text-white transition-colors"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Network Info */}
            <div className="space-y-2 p-3 bg-dicey-dark/50 rounded-xl mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Network</span>
                <span className="text-white">{networkInfo[selectedCrypto.symbol]?.network}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Network Fee</span>
                <span className="text-white">{networkInfo[selectedCrypto.symbol]?.fee}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Minimum Withdrawal</span>
                <span className="text-white">{networkInfo[selectedCrypto.symbol]?.minWithdraw}</span>
              </div>
              {withdrawAmount && (
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-gray-500">You will receive</span>
                  <span className="text-green-400 font-medium">
                    ~{(parseFloat(withdrawAmount) - parseFloat(networkInfo[selectedCrypto.symbol]?.fee.split(" ")[0] || "0")).toFixed(4)} {selectedCrypto.symbol}
                  </span>
                </div>
              )}
            </div>

            {/* Withdraw Button */}
            <button
              type="button"
              disabled={!isValidWithdraw()}
              className={cn(
                "w-full relative group/btn",
                !isValidWithdraw() && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="absolute -inset-1 rounded-xl transition-[transform,opacity,background-color,box-shadow] duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
              {/* Bubble particles on hover */}
              <span className="button-bubble absolute -top-2 left-3 size-3.5 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.8s_ease-out_infinite]" />
              <span className="button-bubble absolute -top-1 left-8 size-3 rounded-full bg-[#39ff14]/50 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_2.0s_ease-out_infinite_0.2s]" />
              <span className="button-bubble absolute -top-2 right-6 size-4 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1.6s_ease-out_infinite_0.4s]" />
              <span className="button-bubble absolute -top-1 right-12 size-2 rounded-full bg-[#39ff14]/40 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.9s_ease-out_infinite_0.1s]" />
              <span className="button-bubble absolute top-0 left-1/2 size-3 rounded-full bg-[#39ff14]/55 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.7s_ease-out_infinite_0.3s]" />
              {/* Dark inset ring - extends bottom to cover 3D depth */}
              <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[6px] rounded-[14px] bg-black/20" />
              <span className="absolute inset-0 translate-y-1 bg-[#1a5c0a] rounded-xl" />
              <span
                className="relative block px-8 py-3 text-black font-bold rounded-xl transition-[transform,opacity,background-color,box-shadow] duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                  boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
                }}
              >
                <span className="cta-shimmer" />
                <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>
                  Withdraw {selectedCrypto.symbol}
                </span>
              </span>
            </button>

            {/* Warning */}
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-2">
                <svg className="size-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xs text-yellow-200">
                  Please double-check the withdrawal address. Transactions cannot be reversed once confirmed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  );
}
