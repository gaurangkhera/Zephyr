import { Metadata } from "next";
import DashboardGigFeed from "@/components/dashboard/gig-feed";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Find gigs",
};

const page = async () => {
  const gigs = await db.gig.findMany({
    include: {
      user: true,
      _count: true,
      orders: true,
    },
  });
  return (
    <>
      <DashboardGigFeed gigs={gigs} isPublic={true} />
    </>
  );
};

export default page;
