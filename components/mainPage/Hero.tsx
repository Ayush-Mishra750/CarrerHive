import { Button } from "@/components/ui/button";
import { Search, Briefcase } from "lucide-react";
import Image from "next/image";
import heroImage from "@/public/hero-image.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 dark:from-[#0A0A0A] dark:via-[#0B0B0B] dark:to-[#0C0C0C] transition-colors duration-500">
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* === LEFT COLUMN === */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                100+ Jobs Posted This Week
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Connect with top companies and talented professionals. Whether you&apos;re hiring or job
              hunting, we make it simple, fast, and effective.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
              href="/find-job"
                
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110"
              >
                <Search className="w-5 h-5" />
                Find Jobs
              </Link>

              <Link
                href="/post-job"
                
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 border-2 border-border text-foreground hover:bg-accent/10"
              >
                <Briefcase className="w-5 h-5" />
                Post a Job
              </Link>
            </div>

   
            
          </div>

          {/* === RIGHT COLUMN === */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-blue-500/20 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10 blur-2xl -z-10" />
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-border/50">
              <Image
                src={heroImage}
                alt="Two professionals shaking hands after successful job interview"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
