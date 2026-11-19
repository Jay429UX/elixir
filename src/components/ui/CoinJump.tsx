"use client";

import type { CSSProperties } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/* Spinning coin that leaps out of whatever it is placed in. Place inside a `relative` parent and
   position it with className. `dir` is the sideways drift (1 right, -1 left); `rise` is the jump height. */
export default function CoinJump({
  onDone,
  className = "",
  dir = 1,
  rise = 150,
}: { onDone?: () => void; className?: string; dir?: 1 | -1; rise?: number }) {
  const style = { "--dx": dir, "--rise": `${rise}px` } as CSSProperties;
  return (
    <div aria-hidden="true" className={`promo-coin-jump ${className}`} style={style} onAnimationEnd={onDone}>
      <DotLottieReact src="/animations/coin-spin.json" autoplay loop renderConfig={{ devicePixelRatio: 2 }} />
    </div>
  );
}
