import { redirect } from "next/navigation";

/** Accueil = même jeu qu’avant (play.html). */
export default function Home() {
  redirect("/play.html");
}
