// import { EmptyState } from "@/components/general/EmptyState";
import React from "react";

// import { JobCard } from "@/components/general/JobCard";

import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EmptyState } from "@/components/ui/general/EmptyState";
import { JobCard } from "@/components/ui/general/jobCards";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      job: {
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
      },
    },
  });

  return data;
}

const FavoritesPage = async () => {
  const session = await requireUser();
  const favorites = await getFavorites(session?.id as string);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Saved Job found"
        description="You don't have any Saved yet."
        buttonText="Find a job"
        href="/jobs"
        
      />
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5   gap-4">
       <span className="font-bold flex items-center justify-center text-2xl">Saved Job</span>
      {favorites.map((favorite) => (
        <JobCard job={favorite.job} key={favorite.job.id} />
      ))}
    </div>
  );
};

export default FavoritesPage;