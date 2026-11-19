"use client";

import { useState } from "react";
import Link from "next/link";
import { BiCheck, BiChevronDown, BiCopy, BiSearch, BiX } from "react-icons/bi";
import DepositModal from "@/components/DepositModal";
import { cn } from "@/lib/utils";

const CRYPTO_ASSETS = [
  { symbol: "USDC", name: "USD Coin", icon: "/crypto/usdc.svg", balance: "1,619.45" },
  { symbol: "SOL", name: "Solana", icon: "/crypto/sol.svg", balance: "12.45" },
  { symbol: "ETH", name: "Ethereum", icon: "/crypto/eth.svg", balance: "0.85" },
  { symbol: "BTC", name: "Bitcoin", icon: "/crypto/btc.svg", balance: "0.0234" },
  { symbol: "USDT", name: "Tether", icon: "/crypto/usdt.svg", balance: "500.00" },
  { symbol: "LTC", name: "Litecoin", icon: "/crypto/ltc.svg", balance: "0.00" },
  { symbol: "DOGE", name: "Dogecoin", icon: "/crypto/doge.svg", balance: "0.00" },
  { symbol: "XRP", name: "Ripple", icon: "/crypto/xrp.svg", balance: "0.00" },
  { symbol: "BNB", name: "BNB", icon: "/crypto/bnb.svg", balance: "0.00" },
  { symbol: "MATIC", name: "Polygon", icon: "/crypto/matic.svg", balance: "0.00" },
];

const ADDRESSES: Record<string, { address: string; network: string; min: string }> = {
  USDC: { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38", network: "Ethereum (ERC-20)", min: "10 USDC" },
  SOL: { address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", network: "Solana", min: "0.1 SOL" },
  ETH: { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38", network: "Ethereum", min: "0.01 ETH" },
  BTC: { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin", min: "0.0001 BTC" },
  USDT: { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38", network: "Ethereum (ERC-20)", min: "10 USDT" },
  LTC: { address: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Litecoin", min: "0.01 LTC" },
  DOGE: { address: "D8vFz4p1L37jdg9xYq9v2bT5hK7sW9pM2n", network: "Dogecoin", min: "10 DOGE" },
  XRP: { address: "rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh", network: "Ripple", min: "1 XRP" },
  BNB: { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38", network: "BNB Smart Chain", min: "0.01 BNB" },
  MATIC: { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38", network: "Polygon", min: "5 MATIC" },
};

function MockQr({ symbol }: { symbol: string }) {
  return (
    <div className="grid size-28 shrink-0 place-items-center rounded-xl bg-white p-2 shadow-inner">
      <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-0.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "rounded-[1px]",
              (i + symbol.charCodeAt(0)) % 2 === 0 || i < 5 || i % 5 === 0 ? "bg-[#140d24]" : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function DepositLab() {
  const [isCurrentOpen, setIsCurrentOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("USDC");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const selectedAsset = CRYPTO_ASSETS.find((a) => a.symbol === selectedSymbol) ?? CRYPTO_ASSETS[0];
  const info = ADDRESSES[selectedAsset.symbol] ?? ADDRESSES.USDC;
  const filtered = CRYPTO_ASSETS.filter(
    (a) =>
      a.symbol.toLowerCase().includes(query.toLowerCase()) ||
      a.name.toLowerCase().includes(query.toLowerCase())
  );

  const copyAddr = async () => {
    try {
      await navigator.clipboard.writeText(info.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
              ← Back to casino
            </Link>
            <p className="ui-eyebrow mt-6">Elixir design lab · deposit modal</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              4 Compact Ways to Restyle Deposit
            </h1>
            <p className="ui-body mt-2 max-w-2xl">
              Instead of a tall 10-row scrolling list, here are 4 compact, scannable layouts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCurrentOpen(true)}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            Open Current Modal
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Option 01: 2-Column Coin Grid + Search */}
          <section className="rounded-3xl border border-white/10 bg-[#0d0718]/70 p-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-white">01 · 2-Column Grid + Search</h2>
              <p className="ui-caption mt-0.5">Halves the height immediately and lets users filter coins fast.</p>
            </div>
            <div className="ui-modal-panel mx-auto max-w-md p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Deposit</h3>
                <BiX className="size-5 text-gray-400" />
              </div>
              <label className="relative mt-3 block">
                <BiSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-purple-300/60" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full rounded-xl border border-white/10 bg-dicey-dark py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 outline-none focus:border-purple-400/60"
                />
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {filtered.map((asset) => {
                  const active = asset.symbol === selectedSymbol;
                  return (
                    <button
                      key={asset.symbol}
                      type="button"
                      onClick={() => setSelectedSymbol(asset.symbol)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors",
                        active
                          ? "border-[#39ff14]/60 bg-[#39ff14]/10"
                          : "border-white/5 bg-dicey-dark hover:border-white/20"
                      )}
                    >
                      <img src={asset.icon} alt={asset.symbol} className="size-7 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white">{asset.symbol}</p>
                        <p className="truncate text-[11px] tabular-nums text-gray-400">{asset.balance}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Option 02: Quick Pills + Direct QR (1-Step) */}
          <section className="rounded-3xl border border-white/10 bg-[#0d0718]/70 p-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-white">02 · Quick Coin Pills + Direct Address (1-Step)</h2>
              <p className="ui-caption mt-0.5">Skips the 2-step list—shows top coins as pills + More dropdown right above the QR.</p>
            </div>
            <div className="ui-modal-panel mx-auto max-w-md p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Deposit {selectedAsset.symbol}</h3>
                <BiX className="size-5 text-gray-400" />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {CRYPTO_ASSETS.slice(0, 4).map((asset) => (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => { setSelectedSymbol(asset.symbol); setMoreOpen(false); }}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors",
                      selectedSymbol === asset.symbol
                        ? "border-[#39ff14]/60 bg-[#39ff14]/15 text-white"
                        : "border-white/10 bg-dicey-dark text-gray-300 hover:border-white/25"
                    )}
                  >
                    <img src={asset.icon} alt="" className="size-4" />
                    {asset.symbol}
                  </button>
                ))}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMoreOpen((v) => !v)}
                    className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-dicey-dark px-2.5 py-1.5 text-xs font-semibold text-purple-200 hover:border-white/25"
                  >
                    More <BiChevronDown className="size-4" />
                  </button>
                  {moreOpen && (
                    <div className="absolute right-0 top-full z-20 mt-1.5 w-40 rounded-xl border border-white/15 bg-dicey-card-elevated p-1 shadow-2xl">
                      {CRYPTO_ASSETS.slice(4).map((asset) => (
                        <button
                          key={asset.symbol}
                          type="button"
                          onClick={() => { setSelectedSymbol(asset.symbol); setMoreOpen(false); }}
                          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-white hover:bg-white/10"
                        >
                          <img src={asset.icon} alt="" className="size-4" />
                          <span>{asset.symbol}</span>
                          <span className="ml-auto text-[10px] text-gray-400">{asset.balance}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-dicey-dark p-4">
                <MockQr symbol={selectedAsset.symbol} />
                <div className="min-w-0 flex-1 space-y-2 text-xs">
                  <div>
                    <p className="text-[11px] text-gray-400">Network</p>
                    <p className="font-semibold text-white">{info.network}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">Minimum deposit</p>
                    <p className="font-semibold text-white">{info.min}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-dicey-dark px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-purple-100">{info.address}</span>
                <button
                  type="button"
                  onClick={copyAddr}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#39ff14] px-2.5 py-1 text-xs font-bold text-[#071a04]"
                >
                  {copied ? <BiCheck className="size-4" /> : <BiCopy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </section>

          {/* Option 03: Split Panel (Left Coin Rail + Right Deposit Details) */}
          <section className="rounded-3xl border border-white/10 bg-[#0d0718]/70 p-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-white">03 · Split Panel (Coins Left · QR Right)</h2>
              <p className="ui-caption mt-0.5">Keeps the full list compact on the left while showing deposit details immediately on the right.</p>
            </div>
            <div className="ui-modal-panel grid overflow-hidden sm:grid-cols-[175px_1fr]">
              <div className="max-h-[290px] space-y-1 overflow-y-auto border-b border-white/10 bg-dicey-dark p-2.5 sm:border-b-0 sm:border-r">
                {CRYPTO_ASSETS.map((asset) => (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                      selectedSymbol === asset.symbol ? "bg-white/10 font-bold text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <img src={asset.icon} alt="" className="size-4 shrink-0" />
                    <span className="flex-1">{asset.symbol}</span>
                    <span className="text-[10px] tabular-nums text-gray-500">{asset.balance}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={selectedAsset.icon} alt="" className="size-6" />
                    <div>
                      <p className="text-sm font-bold text-white">{selectedAsset.symbol} Deposit</p>
                      <p className="text-[11px] text-purple-300">{info.network}</p>
                    </div>
                  </div>
                  <BiX className="size-5 text-gray-400" />
                </div>
                <div className="my-4 flex justify-center">
                  <MockQr symbol={selectedAsset.symbol} />
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-dicey-dark px-3 py-2">
                  <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-purple-100">{info.address}</span>
                  <button type="button" onClick={copyAddr} className="text-xs font-bold text-[#39ff14]">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Option 04: Funded-First + Compact Chips */}
          <section className="rounded-3xl border border-white/10 bg-[#0d0718]/70 p-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-white">04 · Funded-First + Other Chips</h2>
              <p className="ui-caption mt-0.5">Highlights balances &gt; 0 in a clean 2-col grid and tucks zero-balance coins into compact chips.</p>
            </div>
            <div className="ui-modal-panel mx-auto max-w-md p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Deposit</h3>
                <BiX className="size-5 text-gray-400" />
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-purple-300/75">
                Active Balances
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {CRYPTO_ASSETS.filter((a) => a.balance !== "0.00").map((asset) => (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors",
                      selectedSymbol === asset.symbol
                        ? "border-[#39ff14]/60 bg-[#39ff14]/10"
                        : "border-white/10 bg-dicey-dark hover:border-white/25"
                    )}
                  >
                    <img src={asset.icon} alt="" className="size-6 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white">{asset.symbol}</p>
                      <p className="text-[11px] tabular-nums text-green-400">{asset.balance}</p>
                    </div>
                  </button>
                ))}
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-purple-300/75">
                Other Currencies
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {CRYPTO_ASSETS.filter((a) => a.balance === "0.00").map((asset) => (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                      selectedSymbol === asset.symbol
                        ? "border-[#39ff14]/60 bg-[#39ff14]/10 text-white"
                        : "border-white/10 bg-dicey-dark text-gray-300 hover:border-white/25"
                    )}
                  >
                    <img src={asset.icon} alt="" className="size-4" />
                    {asset.symbol}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <DepositModal
        isOpen={isCurrentOpen}
        onClose={() => setIsCurrentOpen(false)}
        cryptoAssets={CRYPTO_ASSETS}
      />
    </main>
  );
}
