import { db } from "@/lib/db";
import ProjectFeed from "@/components/projects/project-feed";

const page = async () => {
    const projects = await db.project.findMany({
        orderBy: {
            maxBudget: "desc",
        },
        include: {
          _count: true,
          user: true,
        }
    })
    return (
       <div className="w-full mt-4">
         <ProjectFeed projects={projects} />
       </div>
    )
}

export default page;