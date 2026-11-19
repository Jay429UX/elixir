import type { Metadata } from "next";
import DepositLab from "./DepositLab";

export const metadata: Metadata = {
  title: "Elixir — Deposit Modal Workbench",
};

export default function DepositLabPage() {
  return <DepositLab />;
}
