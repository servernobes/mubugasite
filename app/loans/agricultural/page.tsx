import LoanDetailTemplate from "../../components/LoanDetailTemplate";
import { LOAN_DETAILS } from "@/lib/product-details";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("/loans/agricultural", "Agricultural Loan", "Agricultural loans from Mubuga SACCO for farmers in Kisoro District: finance seeds, inputs, livestock and farm equipment.");

export default function AgriculturalLoan() {
  return (
    <LoanDetailTemplate {...LOAN_DETAILS["agricultural"]} />
  );
}
