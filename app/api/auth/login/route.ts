import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";      

export async function POST(request: Request) {
    try{
        const { email, password } = await request.json();

        // Validate Input
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        await connectToDatabase();
        
        // Find User by Email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // Check if User Exists
        if (!user || !user.hashedPassword) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 404 });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Login successful, you can generate a token or set a cookie here if needed
        
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }finally {        
        await prisma.$disconnect();
    }
}