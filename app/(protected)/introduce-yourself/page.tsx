import IntroduceYourself from "@/components/introduce-yourself";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Onboarding"
  }

const page = () => {
    return <IntroduceYourself />;
}

export default page;