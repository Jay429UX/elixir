"use client";

interface LevelUpBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  bonusAmount: number;
  onClaim: () => void;
}

export default function LevelUpBonusModal({ isOpen, onClose, bonusAmount, onClaim }: LevelUpBonusModalProps) {
  if (!isOpen) return null;

  const handleClaim = () => {
    onClaim();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-dicey-card border border-dicey-border rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dicey-border">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⬆️</span>
            <h2 className="text-lg font-bold text-white">Level Up Bonus</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dicey-border rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Animation Container */}
          <div className="relative w-full bg-dicey-dark rounded-xl overflow-hidden border border-dicey-border mb-4">
            <iframe
              src="https://placeholder.com/level-up-animation"
              className="absolute inset-0 w-full h-full"
              title="Level Up Bonus Animation"
              style={{ border: 'none' }}
            />
            {/* Content */}
            <div className="relative flex flex-col items-center justify-center py-6 bg-gradient-to-br from-dicey-card to-dicey-dark">
              <img
                src="/vip/Icon 1 (diamant)-_4mW1oBJ.png"
                alt="VIP Badge"
                className="w-20 h-20 object-contain mb-3 animate-bounce drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
              />
              <h3 className="text-xl font-bold text-white mb-1">Congratulations!</h3>
              <p className="text-gray-400 text-center text-sm px-4">You've reached a new level and earned a bonus!</p>
              <div className="mt-3 px-5 py-2 bg-dicey-border rounded-xl">
                <span className="text-2xl font-black gold-shimmer">{bonusAmount.toFixed(2)} USDC</span>
              </div>
            </div>
          </div>

          {/* Bonus Info */}
          <div className="bg-dicey-dark/50 rounded-xl p-4 mb-4 border border-dicey-border">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Available Bonus</span>
              <span className="text-xl font-bold gold-shimmer">{bonusAmount.toFixed(2)} USDC</span>
            </div>
          </div>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            disabled={bonusAmount <= 0}
            className={bonusAmount > 0 ? "relative group/btn w-full" : "w-full px-6 py-4 text-base font-bold rounded-xl bg-gray-600 text-gray-400 cursor-not-allowed"}
          >
            {bonusAmount > 0 ? (
              <>
                {/* Glow effect */}
                <span className="absolute -inset-1 rounded-xl transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
                {/* Bubble particles */}
                <span className="absolute -top-2 left-6 size-2 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                <span className="absolute -top-1 left-16 size-1.5 rounded-full bg-[#39ff14]/50 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.4s_ease-out_infinite_0.2s]" />
                <span className="absolute -top-2 right-12 size-2.5 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.4s]" />
                <span className="absolute -top-1 right-24 size-1 rounded-full bg-[#39ff14]/40 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.3s_ease-out_infinite_0.1s]" />
                <span className="absolute top-0 left-1/2 size-1.5 rounded-full bg-[#39ff14]/55 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.1s_ease-out_infinite_0.3s]" />
                {/* Bottom layer for depth */}
                <span className="absolute inset-0 translate-y-1 bg-[#1a5c0a] rounded-xl" />
                {/* Main button */}
                <span
                  className="relative block px-6 py-4 text-base text-black font-bold rounded-xl transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  <span className="cta-shimmer" />
                  <span className="relative flex items-center justify-center gap-2" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Claim {bonusAmount.toFixed(2)} USDC
                  </span>
                </span>
              </>
            ) : (
              'No Bonus Available'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
