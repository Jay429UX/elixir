import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function PrimaryButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn("ui-primary-button group/btn", className)} {...props}>
      <span aria-hidden="true" className="ui-button-glow" />
      <span aria-hidden="true" className="ui-button-ring" />
      <span aria-hidden="true" className="button-bubble ui-button-bubble ui-button-bubble-one" />
      <span aria-hidden="true" className="button-bubble ui-button-bubble ui-button-bubble-two" />
      <span aria-hidden="true" className="button-bubble ui-button-bubble ui-button-bubble-three" />
      <span className="ui-button-face"><span aria-hidden="true" className="cta-shimmer" /><span className="relative">{children}</span></span>
    </button>
  );
}
