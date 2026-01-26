"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(true);
        setPassword("");
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dicey-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-dicey-card border border-dicey-border rounded-2xl p-8">
          {/* Logo placeholder */}
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="size-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">Protected Access</h1>
          <p className="text-gray-400 text-sm text-center mb-6">
            Enter the password to access the Dicey prototype.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-full px-4 py-3 bg-dicey-dark border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-dicey-border focus:ring-purple-500/50 focus:border-purple-500"
                }`}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">Incorrect password. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="relative w-full group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute -inset-1 rounded-xl transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
              {/* Dark inset ring - extends bottom to cover 3D depth */}
              <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[6px] rounded-[14px] bg-black/40" />
              <span className="absolute inset-0 translate-y-1 bg-[#1a5c0a] rounded-xl" />
              <span
                className="relative block w-full px-6 py-3 text-black font-bold rounded-xl transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden text-center"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                  boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
                }}
              >
                <span className="cta-shimmer" />
                <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>
                  {isLoading ? "Verifying..." : "Enter"}
                </span>
              </span>
            </button>
          </form>
        </div>

        <p className="text-gray-500 text-xs text-center mt-4">
          This prototype is confidential. Do not share.
        </p>
      </div>
    </div>
  );
}
