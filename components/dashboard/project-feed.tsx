import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";
import Image from "next/image";
import { titleCase } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  minBudget: number;
  maxBudget: number;
  user: any;
  _count: {
    applicants: number;
    user: number;
  };
}

interface ProjectFeedProps {
  projects: Project[];
}

const DashboardProjectFeed = ({ projects }: ProjectFeedProps) => {
  return (
    <div className="grid grid-cols-8 gap-4 p-2">
      <div className="col-span-4">
        {projects.map((project) => {
          return (
            <Card className="mx-auto my-2">
              <CardHeader>
                <div className="flex items-center">
                  <Image
                    src={project.user.image}
                    height={30}
                    width={30}
                    alt="img"
                    className="rounded-full mr-2"
                  />
                  <Link href={`/projects/${project.id}`}>
                    {" "}
                    <CardTitle>{project.title}</CardTitle>
                  </Link>
                </div>
                <CardDescription className="text-gray-400 font-medium">
                  {titleCase(project.type).replace("_", " ")}
                </CardDescription>
              </CardHeader>
              <CardContent className="truncate -mt-4 text-zinc-400  ">
                {project.description}
              </CardContent>
              <CardFooter className="flex justify-between text-gray-500">
                ${project.minBudget.toLocaleString()} - $
                {project.maxBudget.toLocaleString()} ⋅{" "}
                {project._count.applicants} applicants
                <Link href={`/projects/${project.id}/edit`} className={buttonVariants()}>Edit</Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardProjectFeed;
