"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";
import { useState } from "react";

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  user: any;
  orders: any;
  _count: any;
}

interface GigFeedProps {
  gigs: Gig[];
  isPublic?: boolean;
}

const DashboardGigFeed = ({ gigs, isPublic }: GigFeedProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGigs, setFilteredGigs] = useState(gigs);

  const handleSearch = () => {
    const result = gigs.filter(gig =>
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGigs(result);
  };

  return (
    <>
    <div className="flex flex-row gap-2 justify-center p-4">
        <Input 
          placeholder="Search gigs" 
          className="w-64" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    <div
      className={`grid ${isPublic ? "grid-cols-4" : "grid-cols-2"} gap-4 p-2`}
    >
      {filteredGigs.map((gig) => {
        return (
          <div className="col-span-1" key={gig.id}>
            <Card className="mx-auto my-2">
              <CardHeader>
                <div className="flex items-center">
                  <Image
                    src={gig.user.image}
                    height={30}
                    width={30}
                    alt="img"
                    className="rounded-full mr-2"
                  />
                  <Link href={`/gigs/${gig.id}`}>
                    {" "}
                    <CardTitle>{gig.title}</CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="truncate -mt-4 text-zinc-400  ">
                {gig.description}
              </CardContent>
              <CardFooter className="flex justify-between text-gray-500">
                ${gig.price} ⋅ {gig._count?.orders} orders
                <Link
                  href={`/gigs/${gig.id}/${isPublic ? "" : "edit"}`}
                  className={buttonVariants({
                    size: "lg",
                  })}
                >
                  {isPublic ? "View" : "Edit"}
                </Link>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div></>
  );
};

export default DashboardGigFeed;
