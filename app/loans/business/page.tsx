import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/business", "Business Loan", "Business loans from Mubuga SACCO for traders and small businesses in Kisoro District to buy stock and grow.");

export default function BusinessLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["business"]} />
  );
}
