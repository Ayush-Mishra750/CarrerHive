// app/components/FeaturedJobs.tsx

import { prisma } from "@/app/utils/db";
import { JobCard } from "../ui/general/jobCards";

const FeaturedJobs = async () => {
  // Fetch featured (active) jobs
  const jobs = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      jobTitle: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      location: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6, // show only latest 6 jobs
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8 flex items-center justify-center flex-col">
          
            <h2 className="text-3xl font-bold mb-2 ">Featured Jobs</h2>
            <p className="text-muted-foreground">
              Handpicked opportunities from top companies
            </p>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
           
                job={job}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No featured jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
