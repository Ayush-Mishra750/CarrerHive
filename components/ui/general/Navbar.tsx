import Link from "next/link";

import { Briefcase, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "../button";
import { UserDropdown } from "./userDropdown";
import { ThemeToggle } from "./Theme-Toggle";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown-menu";




export async function Navbar() {
  const session = await auth();
const getUserData = async () => {
  if (!session?.user?.id) {
    return null; // handle case when session is missing
  }

  const data = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      userType: true,
    },
  });

  return data;
};
const userData = await getUserData();
const userType = userData?.userType;


  return (
    <nav className="flex justify-between items-center py-5 sticky w-full z-50 top-0 bg-background/70 backdrop-blur  px-4">
      <Link href="/" className="flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">
          Carrer<span className="text-primary">Hive</span>
        </h1>
      </Link>
  {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Home
        </Link>
        <Link
          href="/find-job"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Find Jobs
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          About
        </Link>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden ml-2 ">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded-md border gap-2 hover:bg-muted/50 transition-colors">
            <Menu className="h-5 w-5 " />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 mr-4">
            <DropdownMenuItem>
              <Link href="/" className="w-full">
                Home
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/find-job" className="w-full">
                Find Jobs
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/about" className="w-full">
                About
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5 ">
        <ThemeToggle />
        <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
          Post Job
        </Link>
       
       {/* { userType === "COMPANY" ? (
  <Link href="/dashboard/recruiter" className={buttonVariants({ size: "lg",variant:"secondary" })}>
    Recruiter Dashboard
  </Link>
) : (
  <Link href="/dashboard/jobseeker" className={buttonVariants({ size: "lg",variant:"secondary" })}>
    JobSeeker Dashboard
  </Link>
)} */}
 {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center ml-10">
        <ThemeToggle />
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="text-left">
                <SheetTitle>
                  Carrer<span className="text-primary">Hive</span>
                </SheetTitle>
                <SheetDescription>
                  Find or post your next job opportunity
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href="/"
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Find New Job
                </Link>
                <Link
                  href="/post-job"
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Post a Job
                </Link>
                <Link
                  href="/login"
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}

