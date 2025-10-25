import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonToHtml } from "@/components/ui/general/JSONtoHtml";

import { Heart } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (jobId: string, userId?: string) => {
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
      where: {
        id: jobId,
        status: "ACTIVE",
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        location: true,
        employmentType: true,
        benefits: true,
        createdAt:true,
        listingDuration:true,
        company: {
          select: {
            name: true,
            website: true,
            location: true,
            about:true
          },
        },
      },
    }),
    userId?prisma.savedJobPost.findUnique({
    where:{
      userId_jobId:{
        jobId,
        userId
      },
    },
      select:{
        id:true
      }
    }):null
    
  ]);
  if(!jobData){
    return notFound()
  }
  return { jobData, savedJob };
};
type Params = Promise<{ jobId: string }>;


const JobPageId = async ({params}:{params:Params}) => {
  const { jobId } = await params;
  const session = await auth();
  const { jobData, savedJob } = await getData(jobId, session?.user?.id);
  console.log(jobData,savedJob);

  return (
    <div className="grid lg:grid-cols-[1fr,400px] gap-8">
      <div className="space-y-6">
        {/* {header} */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-2xl">{jobData.jobTitle}</h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{jobData.company.name}</p>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge className="rounded-full text-white">{jobData.employmentType}</Badge>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge variant="secondary" className="rounded-full text-white">
                {jobData.location}
              </Badge>
            </div>
          </div>
          <Button variant="outline">
            <Heart className="size-4" /> save Job
          </Button>
        </div>

        <section>
          <h3 className="font-semibold text-lg mb-4">Job Description</h3>
          <p className="text-muted-foreground leading-7">
         <JsonToHtml json={JSON.parse(jobData.jobDescription)}/>
          </p>
        </section>
      </div>
    </div>
  );
};

export default JobPageId;
