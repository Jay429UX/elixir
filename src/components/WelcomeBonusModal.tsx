import ModalShell from "./ModalShell";
import PrimaryButton from "./ui/PrimaryButton";
import ModalCloseButton from "./ui/ModalCloseButton";

export default function WelcomeBonusModal({ isOpen, onClose, onExplore }: { isOpen: boolean; onClose: () => void; onExplore: () => void }) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} labelledBy="welcome-bonus-title">
      <div className="ui-modal-panel relative my-auto w-full max-w-md overflow-hidden">
        <div className="relative h-44 overflow-hidden sm:h-52">
          <img src="/videos/alchemist-midas-brew-poster.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover object-[65%_45%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dicey-card via-dicey-card/10 to-transparent" />
          <div className="absolute right-4 top-4"><ModalCloseButton onClick={onClose} label="Close welcome bonus" /></div>
          <p className="ui-eyebrow absolute bottom-4 left-6 sm:left-8">Alchemist&apos;s guarantee</p>
        </div>
        <div className="px-6 pb-7 pt-2 sm:px-8 sm:pb-8">
          <h2 id="welcome-bonus-title" className="hero-headline text-[2.15rem] leading-none text-white sm:text-5xl">Your first play,<br />backed by the King.</h2>
          <p className="hero-headline mb-4 mt-5 text-3xl leading-tight text-[var(--text-accent)]">$100 Risk-Free Bet</p>
          <p className="ui-body">Place your first wager with confidence — if it misses, we refund 100% in bonus funds up to $100.</p>
          <dl className="ui-detail-grid my-6">
            <div><dt className="ui-caption">Refund back</dt><dd className="ui-detail-value">100%</dd></div>
            <div><dt className="ui-caption">Max coverage</dt><dd className="ui-detail-value">$100</dd></div>
          </dl>
          <PrimaryButton onClick={onExplore} className="w-full">Place First Bet</PrimaryButton>
        </div>
      </div>
    </ModalShell>
  );
}
