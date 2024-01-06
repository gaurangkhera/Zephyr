

import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button, buttonVariants } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Image from "next/image"
import { DropdownMenuContent } from "./ui/dropdown-menu"
import Link from "next/link"
import { Gem, User } from "lucide-react"
import { LogoutButton } from "./auth/logout-button"
import { ExitIcon } from "@radix-ui/react-icons"

interface UserAccountNavProps {
    email: string | undefined
    imageUrl: string
    name: string
}

const UserAccountNav = ({ email, imageUrl, name } : UserAccountNavProps) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button className="rounded-full h-8 w-8 aspect-square">
                    <Avatar>
                        {imageUrl ? (
                            <div className="relative aspect-square w-full h-full">
                                <Image fill src={imageUrl} alt="profile picture" referrerPolicy="no-referrer" />
                            </div>
                        ) : (
                            <AvatarFallback>
                                <span className="sr-only">{name}</span>
                            <User className="w-5 h-5" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-0.5 leading-none">
                                    {name && <p className="font-medium text-sm">{name}</p>}
                                    {email && <p className="w-[200px] truncate text-xs text-gray-400">{email}</p>}
                                </div>
                            </div>

            <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                        <Link href={'/dashboard'}>Dashboard</Link>
                </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
                </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav