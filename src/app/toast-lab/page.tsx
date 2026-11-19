import type { Metadata } from "next";
import ToastLab from "./ToastLab";

export const metadata: Metadata = {
  title: "Elixir — Toast Workbench",
  description: "Workbench for designing and testing Elixir toast notifications.",
};

export default function ToastLabPage() {
  return <ToastLab />;
}
