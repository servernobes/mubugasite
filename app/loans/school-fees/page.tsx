import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/school-fees", "School Fees Loan", "School fees loans from Mubuga SACCO so members in Kisoro can keep their children in school.");

export default function SchoolFeesLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["school-fees"]} />
  );
}
