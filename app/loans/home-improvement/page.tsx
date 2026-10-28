import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/home-improvement", "Home Improvement Loan", "Home improvement loans from Mubuga SACCO to build, repair or improve your home in Kisoro District.");

export default function HomeImprovementLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["home-improvement"]} />
  );
}
