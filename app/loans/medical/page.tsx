import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Medical Loan" };

export default function MedicalLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["medical"]} />
  );
}
