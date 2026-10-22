import { permanentRedirect } from "next/navigation";

// Merged into the /savings/institutional page — keep old links working
export default function Page() {
  permanentRedirect("/savings/institutional");
}
