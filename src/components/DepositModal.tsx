"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { BiCheck, BiChevronDown, BiCopy, BiError } from "react-icons/bi";
import ModalShell from "./ModalShell";
import ModalCloseButton from "./ui/ModalCloseButton";
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

const walletAddresses: Record<string, string> = {
  USDC: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
  SOL: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  ETH: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  USDT: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
  LTC: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  DOGE: "D8vFz4p1L37jdg9xYq9v2bT5hK7sW9pM2n",
  XRP: "rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh",
  BNB: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
  MATIC: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
};

const networkInfo: Record<string, { network: string; confirmations: number; minDeposit: string }> = {
  USDC: { network: "Ethereum (ERC-20)", confirmations: 12, minDeposit: "10 USDC" },
  SOL: { network: "Solana", confirmations: 32, minDeposit: "0.1 SOL" },
  ETH: { network: "Ethereum", confirmations: 12, minDeposit: "0.01 ETH" },
  BTC: { network: "Bitcoin", confirmations: 3, minDeposit: "0.0001 BTC" },
  USDT: { network: "Ethereum (ERC-20)", confirmations: 12, minDeposit: "10 USDT" },
  LTC: { network: "Litecoin", confirmations: 6, minDeposit: "0.01 LTC" },
  DOGE: { network: "Dogecoin", confirmations: 6, minDeposit: "10 DOGE" },
  XRP: { network: "Ripple", confirmations: 1, minDeposit: "1 XRP" },
  BNB: { network: "BNB Smart Chain", confirmations: 15, minDeposit: "0.01 BNB" },
  MATIC: { network: "Polygon", confirmations: 20, minDeposit: "5 MATIC" },
};

function QrPattern({
  address,
  symbol,
  icon,
}: {
  address: string;
  symbol: string;
  icon: string;
}) {
  const { size, rects } = useMemo(() => {
    const qr = QRCode.create(address, { errorCorrectionLevel: "H" });
    const n = qr.modules.size;
    const center = (n - 1) / 2;
    const clearRadius = Math.floor(n * 0.16);
    const modules: { r: number; c: number }[] = [];

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (Math.abs(r - center) <= clearRadius && Math.abs(c - center) <= clearRadius) {
          continue;
        }
        if (qr.modules.get(r, c)) {
          modules.push({ r, c });
        }
      }
    }
    return { size: n, rects: modules };
  }, [address]);

  return (
    <div className="relative grid size-32 sm:size-40 place-items-center rounded-2xl bg-white p-2.5 sm:p-3 shadow-lg shadow-black/30">
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full" aria-label={`${symbol} deposit QR code`}>
        {rects.map(({ r, c }) => (
          <rect key={`${r}-${c}`} x={c} y={r} width="0.92" height="0.92" rx="0.2" fill="#140d24" />
        ))}
      </svg>
      <div className="absolute grid size-8 place-items-center rounded-full bg-white p-1 shadow-md">
        <img src={icon} alt="" className="size-full" />
      </div>
    </div>
  );
}

export default function DepositModal({ isOpen, onClose, cryptoAssets }: DepositModalProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(cryptoAssets[0]?.symbol ?? "USDC");
  const [copied, setCopied] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const currencyMenuRef = useRef<HTMLDivElement>(null);

  const selectedCrypto =
    cryptoAssets.find((c) => c.symbol === selectedSymbol) ?? cryptoAssets[0];
  const info = networkInfo[selectedCrypto?.symbol ?? "USDC"] ?? networkInfo.USDC;
  const address = walletAddresses[selectedCrypto?.symbol ?? "USDC"] ?? walletAddresses.USDC;

  useEffect(() => {
    if (!isOpen) setIsCurrencyMenuOpen(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isCurrencyMenuOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(event.target as Node)) {
        setIsCurrencyMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setIsCurrencyMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isCurrencyMenuOpen]);

  const handleSelectCurrency = (symbol: string) => {
    setSelectedSymbol(symbol);
    setCopied(false);
    setIsCurrencyMenuOpen(false);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard unavailable */
    }
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} labelledBy="deposit-modal-title">
      <div className="ui-modal-panel relative my-auto w-full max-w-4xl shrink-0 overflow-hidden p-5 sm:p-7">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-3.5 sm:pb-4">
          <div>
            <h2 id="deposit-modal-title" className="ui-modal-title text-white">
              Deposit
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              Select a currency to view its deposit address
            </p>
          </div>
          <ModalCloseButton onClick={onClose} label="Close deposit modal" />
        </div>

        {/* Mobile: Currency Dropdown (< md) | Desktop: 2-Column Currency Grid Left | QR & Address Right */}
        <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Mobile Currency Dropdown */}
          {selectedCrypto && (
            <div ref={currencyMenuRef} className="relative md:hidden">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isCurrencyMenuOpen}
                aria-label={`Select deposit currency, current ${selectedCrypto.symbol}`}
                onClick={() => setIsCurrencyMenuOpen((open) => !open)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                  isCurrencyMenuOpen
                    ? "border-[#39ff14]/65 bg-[#39ff14]/10"
                    : "border-white/15 bg-dicey-dark hover:border-white/25"
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="size-7 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold text-white">
                      {selectedCrypto.symbol}{" "}
                      <span className="font-normal text-gray-400">· {selectedCrypto.name}</span>
                    </span>
                    <span className="block truncate text-xs tabular-nums text-gray-400">
                      Balance: {selectedCrypto.balance}
                    </span>
                  </div>
                </div>
                <BiChevronDown
                  className={cn(
                    "size-5 shrink-0 text-gray-400 transition-transform duration-200",
                    isCurrencyMenuOpen && "rotate-180"
                  )}
                />
              </button>

              {isCurrencyMenuOpen && (
                <div
                  role="listbox"
                  aria-label="Deposit currencies"
                  className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-xl border border-white/15 bg-dicey-card-elevated p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.65)]"
                >
                  {cryptoAssets.map((crypto) => {
                    const isSelected = crypto.symbol === selectedCrypto.symbol;
                    return (
                      <button
                        key={crypto.symbol}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectCurrency(crypto.symbol)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          isSelected
                            ? "bg-[#39ff14]/12 text-white"
                            : "text-gray-200 hover:bg-white/[0.06]"
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <img src={crypto.icon} alt={crypto.symbol} className="size-6 shrink-0" />
                          <div className="min-w-0">
                            <span className="block text-sm font-semibold text-white">{crypto.symbol}</span>
                            <span className="block truncate text-[11px] text-gray-400">{crypto.name}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-xs tabular-nums text-gray-400">{crypto.balance}</span>
                          {isSelected && <BiCheck className="size-4 text-[#39ff14]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Desktop Left: 2-Column Currency Grid */}
          <div className="hidden md:grid grid-cols-2 gap-1.5">
            {cryptoAssets.map((crypto) => {
              const isSelected = crypto.symbol === selectedCrypto?.symbol;
              return (
                <button
                  key={crypto.symbol}
                  type="button"
                  onClick={() => handleSelectCurrency(crypto.symbol)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors",
                    isSelected
                      ? "border-[#39ff14]/65 bg-[#39ff14]/10 shadow-[0_0_0_1px_rgba(57,255,20,0.16)]"
                      : "border-white/10 bg-dicey-dark hover:border-white/25 hover:bg-white/[0.03]"
                  )}
                >
                  <img src={crypto.icon} alt={crypto.symbol} className="size-7 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">{crypto.symbol}</span>
                    <span className="block truncate text-xs tabular-nums text-gray-400">
                      {crypto.balance}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: QR Code + Address + Network Details */}
          {selectedCrypto && (
            <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-white/10 bg-dicey-dark p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="size-8 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">{selectedCrypto.name}</p>
                    <p className="text-xs text-gray-400">{selectedCrypto.symbol}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-purple-200/90">
                  {info.network}
                </span>
              </div>

              <div className="my-3.5 sm:my-5 flex justify-center">
                <QrPattern address={address} symbol={selectedCrypto.symbol} icon={selectedCrypto.icon} />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-purple-300/75">
                    Deposit Address
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2.5">
                    <span className="min-w-0 flex-1 truncate font-mono text-xs text-white">
                      {address}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#39ff14] px-2.5 py-1 text-xs font-bold text-[#071a04] transition-opacity hover:opacity-90"
                    >
                      {copied ? <BiCheck className="size-4" /> : <BiCopy className="size-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-xl border border-white/5 bg-dicey-card px-3.5 py-2.5">
                    <p className="text-[11px] text-gray-400">Min Deposit</p>
                    <p className="mt-0.5 font-semibold text-white">{info.minDeposit}</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-dicey-card px-3.5 py-2.5">
                    <p className="text-[11px] text-gray-400">Confirmations</p>
                    <p className="mt-0.5 font-semibold text-white">{info.confirmations}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/25 bg-amber-500/10 px-3.5 py-2.5 text-xs leading-snug text-amber-200">
                  <BiError className="mt-0.5 size-4 shrink-0 text-amber-400" />
                  <span>
                    You must send{" "}
                    <strong>
                      {selectedCrypto.symbol} on {info.network}
                    </strong>{" "}
                    only. Sending via another network may result in permanent loss.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
