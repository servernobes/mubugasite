import type { Metadata } from "next";
import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";

export const metadata: Metadata = { title: "School Fees Loan" };

export default function SchoolFeesLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["school-fees"]} />
  );
}
