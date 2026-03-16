import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";      

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Validate input
        if (!name || !email || !password) {
            return new NextResponse(JSON.stringify({ error: 'Name, email, and password are required' }), { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToDatabase();

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            },
        });

        return new NextResponse(JSON.stringify({ message: 'User registered successfully', user: newUser }), { status: 201 }); 

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure the database connection is closed after the operation
    }
};