import { Card } from "@/components/ui/card";
import { Search, Briefcase, Users, TrendingUp, Shield, Zap } from "lucide-react";

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
    <section className="py-24 relative bg-background transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Built for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text ">
              Everyone
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re looking for your next opportunity or searching for top talent, 
            we&apos;ve got the tools you need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Job Seekers */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Search className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">For Job Seekers</span>
            </div>

            <div className="space-y-5">
              {jobSeekerFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-to-br from-background to-primary/5 border border-border hover:border-primary/40 
                             hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-2xl"
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
                      <feature.icon className="w-6 h-6 " />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recruiters */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">For Recruiter </span>
            </div>

            <div className="space-y-5">
              {recruiterFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-to-br from-background to-secondary/5 border border-border hover:border-secondary/40 
                             hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 rounded-2xl"
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent shadow-md">
                      <feature.icon className="w-6 h-6 " />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
