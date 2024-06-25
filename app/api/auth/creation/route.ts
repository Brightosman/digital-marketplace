import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";

export async function GET(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if(!user || user === null || !user.id){
        throw new Error("Something went wrong...")
    }

    let dbUser = await prisma.user.findUnique({
        where:{
            id: user.id,
        }
    })

    if(!dbUser){
        const account = await stripe.accounts.create({
            email: user.email as string,
            controller: {
                losses: {
                payments: "application",
                },
                fees: {
                payer: "application",
                },
                stripe_dashboard: {
                type: "express",
                },
            },
        });

        dbUser = await prisma.user.create({
            data:{
                id: user.id,
                firstName: user.given_name ?? "",
                lastName:user.family_name ?? "",
                email: user.email ?? "",
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
                connectedAccountId: account.id,
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000")
}