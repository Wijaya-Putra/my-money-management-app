'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//READ actions
export async function getUsers(){
    try{
        const user = await prisma.user.findMany({

        });
        return user;
    }
    catch(error){
        console.error("Error fetching users:", error);
        throw error;
    }
}
