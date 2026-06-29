import { redirect } from "next/navigation";

// Langue par défaut : anglais.
export default function RootPage() {
  redirect("/en");
}
