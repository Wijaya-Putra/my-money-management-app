import prisma from "@/lib/prisma";

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection failed', error);
        throw new Error('Database connection failed');
    }finally {
        // Clean up resources if needed
    }
}