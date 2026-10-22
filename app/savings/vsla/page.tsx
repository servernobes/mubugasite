import { permanentRedirect } from "next/navigation";

// Merged into the /savings/group page — keep old links working
export default function Page() {
  permanentRedirect("/savings/group");
}
