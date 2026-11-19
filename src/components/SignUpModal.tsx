"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import PrimaryButton from "./ui/PrimaryButton";
import ModalCloseButton from "./ui/ModalCloseButton";
import { cn } from "@/lib/utils";
import { AppleLogo, DiscordLogo, XLogo } from "@phosphor-icons/react";

/* Google's four-colour "G" (the official mark is multicolour, so it is drawn rather than tinted). */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/* Brand marks: Google multicolour, Apple and X in white, Discord in its blurple. */
const socials = [
  { name: "Google", icon: <GoogleG className="size-5" /> },
  { name: "Apple", icon: <AppleLogo weight="fill" className="size-5 text-white" /> },
  { name: "Discord", icon: <DiscordLogo weight="fill" className="size-5 text-[#5865F2]" /> },
  { name: "X", icon: <XLogo weight="fill" className="size-5 text-white" /> },
] as const;

type Mode = "signup" | "signin";

/* Visual only: nothing is validated or sent anywhere. Any input, or none, closes it. */
export default function SignUpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("signup");
  const field = "w-full rounded-xl border border-white/10 bg-dicey-dark px-4 py-3 text-base sm:text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-lime-300/60";
  const isSignUp = mode === "signup";

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} labelledBy="sign-up-title">
      <div className="ui-modal-panel relative my-auto grid w-full max-w-3xl shrink-0 overflow-hidden md:grid-cols-[1fr_1.05fr]">
        {/* Left: video with the offer */}
        <div className="relative h-44 overflow-hidden md:h-auto md:min-h-[520px]">
          <img src="/videos/signup-new-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 hidden h-full w-full object-cover object-center motion-reduce:block" />
          <video
            src="/videos/signup-new.mp4"
            poster="/videos/signup-new-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160424] via-[#160424]/45 to-transparent md:bg-gradient-to-t md:from-[#160424]/95 md:via-[#160424]/30" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <p className="text-[13px] font-bold tracking-[0.02em] text-purple-300">Welcome bonus</p>
            <p
              className="mt-1.5 font-[family-name:var(--font-hero)] text-[36px] font-black leading-[0.96] tracking-[-0.045em] text-white md:text-[48px]"
              style={{ textShadow: "0 2px 12px rgba(10, 2, 20, 0.55)" }}
            >
              100% up to $1,000
            </p>
            <p className="mt-2 text-base font-medium text-purple-200/85">On your first deposit.</p>
          </div>
          <div className="absolute right-4 top-4 md:hidden"><ModalCloseButton onClick={onClose} label="Close sign up" /></div>
        </div>

        {/* Right: sign up and sign in */}
        <form
          className="relative flex flex-col px-6 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-8"
          onSubmit={(event) => { event.preventDefault(); onClose(); }}
        >
          <div className="absolute right-4 top-4 hidden md:block"><ModalCloseButton onClick={onClose} label="Close sign up" /></div>

          <div role="tablist" aria-label="Account" className="mb-6 inline-flex self-start rounded-xl bg-dicey-dark p-1 md:mr-12">
            {([["signup", "Sign up"], ["signin", "Sign in"]] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150",
                  mode === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <h2 id="sign-up-title" className="hero-headline text-4xl leading-none text-white">{isSignUp ? "Join Elixir" : "Welcome back"}</h2>
          <p className="ui-body mt-3">
            {isSignUp ? "Create your account to claim your welcome bonus." : "Sign in to pick up where you left off."}
          </p>

          <div className="mt-6 space-y-3">
            <label className="block">
              <span className="sr-only">{isSignUp ? "Email" : "Email or username"}</span>
              <input
                type={isSignUp ? "email" : "text"}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                enterKeyHint="next"
                placeholder={isSignUp ? "Email" : "Email or username"}
                className={field}
              />
            </label>
            <label className="block">
              <span className="sr-only">Password</span>
              <input type="password" autoComplete="off" enterKeyHint="done" placeholder="Password" className={field} />
            </label>
          </div>

          {!isSignUp && (
            <button type="button" onClick={onClose} className="mt-3 self-end text-xs text-gray-400 hover:text-white">Forgot password?</button>
          )}

          <PrimaryButton type="submit" className="mt-6 w-full">{isSignUp ? "Create account" : "Sign in"}</PrimaryButton>

          <div className="my-5 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-white/10" />
            <span className="ui-caption">or continue with</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {socials.map(({ name, icon }) => (
              <button
                key={name}
                type="button"
                onClick={onClose}
                aria-label={`${isSignUp ? "Sign up" : "Sign in"} with ${name}`}
                className="grid h-12 place-items-center rounded-xl border border-white/10 bg-dicey-dark text-white transition-colors duration-150 hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70"
              >
                {icon}
              </button>
            ))}
          </div>

          <p className="ui-caption mt-5 text-center">
            {isSignUp ? "Already have an account? " : "New to Elixir? "}
            <button type="button" onClick={() => setMode(isSignUp ? "signin" : "signup")} className="font-semibold text-white hover:underline">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </form>
      </div>
    </ModalShell>
  );
}
