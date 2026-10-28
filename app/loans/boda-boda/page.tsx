import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/boda-boda", "Boda Boda Loan", "Boda boda loans from Mubuga SACCO help members in Kisoro buy or repair a motorcycle and earn a living.");

export default function BodaBodaLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["boda-boda"]} />
  );
}
