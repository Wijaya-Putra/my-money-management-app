'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function RegisterPage() {

  const router = useRouter();
  const  {register, handleSubmit, formState:{isSubmitting}} = useForm();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)

  const onsubmit = async (e: any) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password,
          name
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        setShowSuccess(true)

        // Clear Form
        setEmail("");
        setPassword("");
        setName("");

        //Alert & redirect to login page after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
          router.push("/login");
        }, 2000); 

      } else {
        const data = await response.json()
        alert(data.error || "Registration failed")
      }

    } catch (error) {
      console.error("An error occurred during registration:", error);
      // Handle network or other errors
    } finally {
      // Any cleanup or final actions can be performed here
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    {showSuccess && (
      <motion.div
        // Starts 20px below its position and transparent
        initial={{ opacity: 0, y: 20 }}
        // Animates to its natural position and full opacity
        animate={{ opacity: 1, y: 0 }}
        // Animates back down and fades out when showSuccess becomes false
        exit={{ opacity: 0, y: 20 }}
        // Adjust duration and easing for a "shadcn" feel
        transition={{ duration: 0.7, ease: "easeOut" }}
        // Your existing styles (ensure 'fixed' or 'absolute' is used)
        className="fixed top-4 right-4 z-50 grid w-full max-w-md items-start gap-4"
      >
        <div className="grid w-full max-w-md items-start gap-4 absolute top-4 right-4 size-16">
          <Alert className="border-green-500 bg-green-50 text-green-700">
            <CheckCircle2 className="h-4 w-4 stroke-green-700" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your account has been created. Redirecting to home...
            </AlertDescription>
          </Alert>
        </div>
      </motion.div>
    )}

      <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Register Account</CardTitle>
            <CardDescription>
              Enter your email below to register your account
            </CardDescription>
          </CardHeader>

          <form id="register-form" onSubmit={handleSubmit(onsubmit)}>
          <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
              disabled={showSuccess} 
              className="w-full"
              form="register-form"
            >
                Register
            </Button>
          </CardFooter>
      </Card>
    </main>
  );
}
