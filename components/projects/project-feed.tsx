"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import Image from "next/image";
import { titleCase } from "@/lib/utils";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserIcon } from "lucide-react";

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

const UserInfo = () => {
  const user = useCurrentUser();
  return (
    <div className="grid grid-rows-3 col-span-2 gap-4 h-full w-full">
      <Card className="row-span-1 overflow-auto">
        <CardContent className="flex flex-col items-center mt-8">
          {user ? (
            <>
              <Image
                src={user.image as string}
                height={100}
                width={100}
                alt="User Image"
                className="rounded-full"
              />
              <CardTitle className="mt-4">{user.name}</CardTitle>
              <CardDescription className="text-gray-400">
                {user.occupation} ⋅ {user.experience} {user.experience > 1 ? 'years' : 'year'} of experience
              </CardDescription>
              <Button className="mt-4">Edit profile</Button>
            </>
          ) : (
            <>
              <UserIcon className="w-20 h-20" />
              <CardTitle>Log in to see your details here.</CardTitle>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="row-span-1 overflow-auto">
        <CardContent className="flex flex-col items-center mt-8">
          {user ? (
            <>
              <CardDescription className="text-gray-400 text-justify mt-2">
                {user.bio}
              </CardDescription>
            </>
          ) : (
            <>
              <UserIcon className="w-20 h-20" />
              <CardTitle>Log in to see your details here!</CardTitle>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const ProjectFeed = ({ projects }: ProjectFeedProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRemoteWork, setIsRemoteWork] = useState(false);
  const [isFullTime, setIsFullTime] = useState(false);
  const [isPartTime, setIsPartTime] = useState(false);
  const [tempIsRemoteWork, setTempIsRemoteWork] = useState(false);
  const [tempIsFullTime, setTempIsFullTime] = useState(false);
  const [tempIsPartTime, setTempIsPartTime] = useState(false);

  const filtered = projects.filter((project) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearchQuery =
      project.title.toLowerCase().includes(lowerCaseQuery) ||
      project.description.toLowerCase().includes(lowerCaseQuery) ||
      project.maxBudget.toString().includes(searchQuery);

    const matchesTypeFilter =
      (isRemoteWork && project.type === "REMOTE_WORK") ||
      (isFullTime && project.type === "FULL_TIME") ||
      (isPartTime && project.type === "PART_TIME");

    return matchesSearchQuery && matchesTypeFilter;
  });

  return (
    <div className="grid grid-cols-8 gap-4 p-2">
      <Card className="h-[600px] col-span-2 overflow-auto">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Prefer remote work? Need to work on a specific stack? Filter
            projects according to your preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Project type</Label> <br />
          <Checkbox
            onCheckedChange={() => setTempIsRemoteWork(!tempIsRemoteWork)}
            checked={tempIsRemoteWork}
          />{" "}
          Remote work <br />
          <Checkbox
            onCheckedChange={() => setTempIsFullTime(!tempIsFullTime)}
            checked={tempIsFullTime}
          />{" "}
          Full time <br />
          <Checkbox
            onCheckedChange={() => setTempIsPartTime(!tempIsPartTime)}
            checked={tempIsPartTime}
          />{" "}
          Part time
        </CardContent>
        <CardFooter className="gap-2">
          <Button
            variant={"ghost"}
            onClick={() => {
              setTempIsRemoteWork(false);
              setTempIsFullTime(false);
              setTempIsPartTime(false);
              setIsRemoteWork(false);
              setIsFullTime(false);
              setIsPartTime(false);
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              setIsRemoteWork(tempIsRemoteWork);
              setIsFullTime(tempIsFullTime);
              setIsPartTime(tempIsPartTime);
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
      <div className="col-span-4">
        <Card className="mx-auto mb-4">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Zephyr.</CardTitle>
          </CardHeader>
          <CardContent className="truncate text-gray-400">
            Find your next project, or hire a developer to work on your project.
          </CardContent>
          <CardFooter className="flex justify-between gap-1.5">
            <Input
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Button>Search</Button>
          </CardFooter>
        </Card>
        {(searchQuery !== "" || isRemoteWork || isPartTime || isFullTime
          ? filtered
          : projects
        ).map((project) => {
          return (
            <Link href={`/projects/${project.id}`} key={project.id}>
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
                    <CardTitle>{project.title}</CardTitle>
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
                  <Button size={"lg"}>Apply</Button>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
      <UserInfo />
    </div>
  );
};

export default ProjectFeed;
