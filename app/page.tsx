'use client'

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

import { Session } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home Page

      Welcome {session.user?.name}!

      <button 
        className="w-full" 
        onClick={() => signOut({ callbackUrl: "/login" })}>
          Log Out
        </button>
    </main>
  );
}
