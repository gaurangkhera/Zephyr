import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
    try {
        const { userId, technologies, experience, occupation, bio } = await req.json();
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
        return {
            status: 404,
            json: { message: "User not found" },
        };
    }

    await db.user.update({
        where: { id: userId },
        data: {
            experience,
            occupation,
            bio
        },
    
    })

    for(let i = 0; i < technologies.length; i++) {
        const technology = await db.technology.findUnique({ where: { name: technologies[i] } });
        if (!technology) {
            const newTech = await db.technology.create({
                data: {
                    name: technologies[i],
                }
            })

            await db.userTechnology.create({
                data: {
                    technologyId: newTech.id,
                    userId,
                }
            })
        }

        if(technology){
            await db.userTechnology.create({
                data: {
                    technologyId: technology.id,
                    userId,
                }
            })
        }
    }

    return new NextResponse("Onboarding successful", { status: 200 })
    } catch (error){
        return new NextResponse(`Onboarding failed with error: ${error}`, { status: 500 })
    }
    
}