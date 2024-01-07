import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import ProjectFeed from "@/components/projects/project-feed";

const page = async () => {
    const user = await currentUser();
    const hostedProjects = await db.project.findMany({
        where: {
            userId: user?.id
        },
        include: {
            user: true,
            _count: true
        }
    })
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Hosted Projects</h2>
                    <ProjectFeed projects={hostedProjects} />
                </div>
            </div>
        </>
    )
}
export default page;