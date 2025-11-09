import Link from "next/link";

import Image from "next/image";
import Logo from "@/public/logo.png";

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



export async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center py-5 sticky w-full z-50 top-0 bg-background/70 backdrop-blur  px-4">
      <Link href="/" className="flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">
          Carrer<span className="text-primary">Hive</span>
        </h1>
      </Link>
 <nav className="hidden md:flex items-center gap-8">
       
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/find-job" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Find Jobs
            </Link>
            <Link href="/companies" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Companies
            </Link>
            <Link href="/feature" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              AI Career Assistant
            </Link>
           
          </nav>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
          Post Job
        </Link>
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
      <div className="md:hidden flex items-center gap-4">
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
                  Job<span className="text-primary">Marshal</span>
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
// "use client";

// import Link from "next/link";
// import { Briefcase, Bell, Menu, User } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { ThemeToggle } from "./Theme-Toggle";
// import { UserDropdown } from "./userDropdown";
// import { auth } from "@/app/utils/auth";
// // import { auth } from "@/app/utils/auth";

// export async function Navbar() {
//   const session = await auth();

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg transition-colors">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 font-bold text-xl">
//           <Briefcase className="h-6 w-6 text-primary" />
//           <span>CareerHub</span>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-8">
//           <Link
//             href="/find-job"
//             className="text-sm font-medium hover:text-primary transition-colors"
//           >
//             Find Jobs
//           </Link>
//           <Link
//             href="/companies"
//             className="text-sm font-medium hover:text-primary transition-colors"
//           >
//             Companies
//           </Link>
//           <Link
//             href="/career-assistant"
//             className="text-sm font-medium text-primary hover:text-accent transition-colors"
//           >
//             AI Career Assistant
//           </Link>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-3">
//           <ThemeToggle />

//           <Button variant="ghost" size="icon">
//             <Bell className="h-5 w-5" />
//           </Button>

//           {session?.user ? (
//             <UserDropdown
//               email={session.user.email as string}
//               name={session.user.name as string}
//               image={session.user.image as string}
//             />
//           ) : (
//             <Link
//               href="/login"
//               className={buttonVariants({ variant: "outline", size: "sm" })}
//             >
//               Login
//             </Link>
//           )}

//           <Link
//             href="/post-job"
//             className={buttonVariants({
//               variant: "default",
//               size: "sm",
//               className: "hidden sm:inline-flex",
//             })}
//           >
//             Post a Job
//           </Link>
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden flex items-center gap-2">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="p-6 space-y-4">
//               <Link href="/" className="block text-lg font-medium">
//                 Find Jobs
//               </Link>
//               <Link href="/companies" className="block text-lg font-medium">
//                 Companies
//               </Link>
//               <Link href="/career-assistant" className="block text-lg font-medium">
//                 Career Assistant
//               </Link>
//               <Link href="/post-job" className="block text-lg font-medium">
//                 Post a Job
//               </Link>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// }
