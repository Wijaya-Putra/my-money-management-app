'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {

  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (onSubmit: any) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (res.ok) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const { error } = await res.json();
        setError(error);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      formData.delete("email");
      formData.delete("name");
      formData.delete("password");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Register Account</CardTitle>
            <CardDescription>
              Enter your email below to register your account
            </CardDescription>
          </CardHeader>

          <form id="register-form" onSubmit={handleSubmit}>
          <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="Ellen Doe"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>
          </CardContent>
          </form>

          <CardFooter className="flex-col gap-2">
            <Button 
              type="submit" 
              className="w-full"
              form="register-form"
            >
                Register
            </Button>
            <Button variant="outline" className="w-full">
              <a href="/login"> Already have an account? Login </a>
            </Button>
          </CardFooter>
      </Card>
    </main>
  );
}
