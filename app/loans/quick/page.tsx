import { redirect } from "next/navigation";
export default function QuickLoanRedirect() {
  redirect("/loans/emergency");
}
