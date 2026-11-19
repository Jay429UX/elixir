export default function ModalCloseButton({ onClick, label = "Close modal" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="ui-close-button">
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M6 18 18 6" /></svg>
    </button>
  );
}
