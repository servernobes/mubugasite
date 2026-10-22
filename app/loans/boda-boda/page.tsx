import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Boda Boda Loan" };

export default function BodaBodaLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["boda-boda"]} />
  );
}
