"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  returnFocusTo?: string;
}

export default function ModalShell({ isOpen, onClose, labelledBy, children, returnFocusTo }: ModalShellProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      const returnTarget = returnFocusTo ? document.querySelector<HTMLElement>(returnFocusTo) : trigger;
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
    };
  }, [isOpen, returnFocusTo]);

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="app-dialog"
      aria-labelledby={labelledBy}
      onCancel={(event) => { event.preventDefault(); closeRef.current(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) { event.preventDefault(); return; }
        if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }}
    >
      <div
        className="flex min-h-full items-start justify-center px-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:py-8"
        onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      >
        {children}
      </div>
    </dialog>,
    document.body
  );
}
