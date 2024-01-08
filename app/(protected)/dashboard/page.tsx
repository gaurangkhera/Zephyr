import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import DashboardProjectFeed from "@/components/dashboard/project-feed";
import { Smile } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your projects"
}

const page = async () => {
  const user = await currentUser();
  const hostedProjects = await db.project.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: true,
      _count: true,
    },
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {hostedProjects.length > 0 ? (
            <>
              <DashboardProjectFeed projects={hostedProjects} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <Smile size={48} color="gray" className="mb-4" />
              <p>Nothing to show here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default page;
