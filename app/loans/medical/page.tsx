import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/medical", "Medical Loan", "Medical loans from Mubuga SACCO help members cover hospital and treatment costs for their families.");

export default function MedicalLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["medical"]} />
  );
}
