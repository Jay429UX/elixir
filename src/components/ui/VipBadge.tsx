"use client";

import { memo } from "react";
import { ProgressiveHexBadgeSvg } from "@/components/ui/ProgressiveHexBadge";

/**
 * VIP badge rendered with the Progressive Hex Ascension (Option 18) SVG system.
 * Still by default across the main site; pass `animated` on hero modal reveals
 * to play the one-shot multi-layer Clockwork Forge mechanical assembly on load.
 */
const VipBadge = memo(function VipBadge({
  src,
  alt = "VIP",
  className = "",
  sheen = false,
  level,
  tier,
  animated = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  sheen?: boolean;
  level?: 1 | 2 | 3 | 4 | 5;
  tier?: 1 | 2 | 3 | 4 | 5;
  animated?: boolean;
}) {
  const parsedTier = tier ?? Number(src.match(/tier(\d)/)?.[1] ?? 1);
  const tierIndex = Math.max(0, Math.min(4, parsedTier - 1));

  return (
    <span
      className={`${animated ? "vip-badge-anim" : "vip-badge-static"} ${animated && sheen ? "vip-badge-sheen" : ""} ${className}`}
      role="img"
      aria-label={alt}
      suppressHydrationWarning
    >
      <span aria-hidden="true" className="vba-svg">
        <ProgressiveHexBadgeSvg tierIndex={tierIndex} level={level} alt={alt} />
      </span>
    </span>
  );
});

export default VipBadge;
