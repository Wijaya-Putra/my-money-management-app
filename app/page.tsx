import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default function Home() {
  const session = getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home Page
    </main>
  );
}
