import { ErrorCard } from "@/components/auth/error-card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "An error occured"
}

const AuthErrorPage = () => {
  return ( 
    <ErrorCard />
  );
};
 
export default AuthErrorPage;
