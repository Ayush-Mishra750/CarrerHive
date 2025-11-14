import { Card } from "@/components/ui/card";
import { Search, Briefcase, Users, TrendingUp, Shield, Zap, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import heroImage from '../../public/image.png';
import Image from "next/image";
import Link from "next/link";

const jobSeekerFeatures = [
  {
    icon: Search,
    title: "Smart Job Search",
    description: "Find relevant opportunities with our AI-powered search and filtering system.",
  },
  {
    icon: Zap,
    title: "Instant Applications",
    description: "Apply to multiple positions with one click using your saved profile.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Get personalized recommendations and track your career progress.",
  },
];

const recruiterFeatures = [
  {
    icon: Briefcase,
    title: "Easy Job Posting",
    description: "Post jobs in minutes and reach thousands of qualified candidates.",
  },
  {
    icon: Users,
    title: "Talent Pool",
    description: "Access a diverse pool of pre-screened, talented professionals.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Connect with verified candidates to ensure quality and trust.",
  },
];

const Features = () => {
  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-b from-background to-muted/30 overflow-hidden width-full">
      <div className="absolute inset-0 opacity-10">
        <Image 
          src={heroImage} 
          alt="Career opportunities" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Find Your Dream Job with
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-primary">
                AI-Powered Career Guidance
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover opportunities that match your skills and get personalized recommendations to grow your career
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Job title or keyword" 
                  className="pl-10 h-12 border-border"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Location" 
                  className="pl-10 h-12 border-border"
                />
              </div>
              {/* <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Experience level" 
                  className="pl-10 h-12 border-border"
                />
              </div> */}
            </div>
           <Link href="/find-job">    <Button  size="lg" className="w-full md:w-auto px-8 font-white bg-primary hover:bg-blend-lighten cursor-pointer">
              <Search className="mr-2 h-5 w-5" />
              Search Jobs
            </Button></Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              10,000+ Active Jobs
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              AI Career Assistant
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              500+ Companies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
