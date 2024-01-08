import { db } from "@/lib/db";
import ProjectFeed from "@/components/projects/project-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Find projects"
}

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
         <ProjectFeed projects={projects} isDashboard={false} />
       </div>
    )
}

export default page;