"use client";   
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { APPNAME } from "@/config";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserAccountNav from "./UserAccountNav";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { LoginButton } from "./auth/login-button";

const Navbar = () => {
    const user = useCurrentUser();
    return (
        <MaxWidthWrapper><nav className="sticky -14  inset-x-0 top-0 z-30 border-b border-gray-800 backdrop-blur-lg transition-all">
        <div className="flex h-14  items-center justify-between border-b border-zinc-800">
            <Link href="/" className="flex z-40 font-semibold">{APPNAME}</Link>

            <div className="hidden items-center space-x-4 sm:flex">
            <Link href="/find-projects" className={buttonVariants({
                     variant: "ghost",
                     size: "sm"
                 })}>Find projects</Link>
            <Link href="/find-gigs" className={buttonVariants({
                     variant: "ghost",
                     size: "sm"
                 })}>Find gigs</Link>
               { !user ? (
                 <>
                 <Button><LoginButton>Log in</LoginButton></Button>
             </>
               ) : (
                <>
                <UserAccountNav name={user.name as string} imageUrl={user.image as string} email={user.email as string} />
            </>
               )}
            </div>
        </div>
</nav></MaxWidthWrapper>
    )
}

export default Navbar;