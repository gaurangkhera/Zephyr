import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest): Promise<Response> => {
    try {
        const { userId, technologies, experience, occupation, bio } = await req.json();
        const user = await db.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        await db.user.update({
            where: { id: userId },
            data: {
                experience,
                occupation,
                bio
            },
        });

        for (const tech of technologies) {
            let technology = await db.technology.findUnique({ where: { name: tech } });

            if (!technology) {
                technology = await db.technology.create({
                    data: {
                        name: tech,
                    }
                });
            }

            await db.userTechnology.create({
                data: {
                    technologyId: technology.id,
                    userId,
                }
            });
        }

        return new Response("Onboarding successful", { status: 200 });
    } catch (error) {
        return new Response(`Onboarding failed with error: ${error}`, { status: 500 });
    }
}