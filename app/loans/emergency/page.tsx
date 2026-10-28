import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/emergency", "Emergency Loan", "Quick emergency loans from Mubuga SACCO to help members in Kisoro handle unexpected costs.");

export default function EmergencyLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["emergency"]} />
  );
}
