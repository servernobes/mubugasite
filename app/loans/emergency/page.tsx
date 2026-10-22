import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "Emergency Loan" };

export default function EmergencyLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["emergency"]} />
  );
}
