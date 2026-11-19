"use client";

import { useEffect, useState, type CSSProperties, type ReactEventHandler } from "react";

interface AlphaVideoProps {
  /** Transparent VP9 WebM path (used on Chrome, Firefox, Edge, Android) */
  webmSrc: string;
  /** Animated WebP with alpha fallback (used on iOS Safari, WKWebView, and macOS Safari) */
  webpSrc: string;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  onLoadedMetadata?: ReactEventHandler<HTMLVideoElement>;
}

function shouldUseAnimatedWebp(): boolean {
  if (typeof navigator === "undefined") return true;
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  return isIOS || isSafari;
}

/**
 * Renders a transparent looping animation cleanly across all browsers:
 * - Chrome/Firefox/Edge/Android: VP9 WebM with alpha (<video>)
 * - iPhone/iPad (Safari, Messenger/Instagram WKWebView, Chrome iOS) & macOS Safari:
 *   Animated WebP with full 8-bit alpha (<img>), avoiding WebKit's black-box VP9 alpha bug.
 */
export default function AlphaVideo({
  webmSrc,
  webpSrc,
  poster,
  width,
  height,
  className,
  style,
  onLoadedMetadata,
}: AlphaVideoProps) {
  const [useWebp, setUseWebp] = useState<boolean>(true);

  useEffect(() => {
    setUseWebp(shouldUseAnimatedWebp());
  }, []);

  if (useWebp) {
    return (
      <img
        src={webpSrc}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        className={className}
        style={style}
      />
    );
  }

  return (
    <video
      src={webmSrc}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      width={width}
      height={height}
      className={className}
      style={style}
      onLoadedMetadata={onLoadedMetadata}
    />
  );
}
