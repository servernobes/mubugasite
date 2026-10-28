import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/development", "Development Loan", "Development loans from Mubuga SACCO for members' long-term projects such as land, buildings and investments in Kisoro.");

export default function DevelopmentLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["development"]} />
  );
}
