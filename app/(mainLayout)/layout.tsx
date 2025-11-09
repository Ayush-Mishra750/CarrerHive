import { Navbar } from "@/components/ui/general/Navbar";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function MainLayout({children}:{children:ReactNode}){
    return (
 <div className="width-full mx-auto px-4 md:px-6 lg:px-8">
            <Navbar/>
            {children}
            <Toaster/>
        </div>
    )
}