

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PenBoxIcon, XCircle, User2, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EmptyState } from "@/components/ui/general/EmptyState";
import { CopyLinkMenuItem } from "@/components/ui/general/CopyLinkMenuItem";

async function getJobs(userId:string){
    const data=await prisma.jobPost.findMany({
        where:{
         company:{userId}
        },
        select:{
          id:true,
          jobTitle:true,
          status:true,
          createdAt:true,
          company:{
            select:{
                logo:true,
                name:true,

            }
          }
        },
        orderBy:{createdAt:"desc"}
    })
    return data;
}

const MyJobListing = async () => {
  const session = await requireUser();
  const data = await getJobs(session.id as string);

  if (data.length === 0)
    return (
      <EmptyState
        title="No job posts found"
        description="You don't have any job posts yet."
        buttonText="Create a job post"
        href="/post-job"
      />
    );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">My Job Listings</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your job postings in one place.
          </p>
        </div>
        <Link href="/post-job">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            + Post New Job
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((job) => (
          <Card
            key={job.id}
            className="p-5 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              {job.company.logo ? (
                <Image
                  src={job.company.logo}
                  alt={job.company.name}
                  width={48}
                  height={48}
                  className="rounded-full border"
                />
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3">
                  <User2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
              )}
              <div>
                <h2 className="font-semibold text-base">{job.jobTitle}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-4 w-4" /> {job.company.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <Badge
                variant={
                  job.status === "ACTIVE"
                    ? "default"
                    : job.status === "ExPIRED"
                    ? "destructive"
                    : "secondary"
                }
                className="w-fit capitalize text-white"
              >
                {job.status.toLowerCase()}
              </Badge>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                📅 Posted on{" "}
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {job.createdAt.toLocaleString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <Link href={`/job/${job.id}`}>
                <Button size="sm" className="rounded-full text-sm text-white">
                  View Job
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/my-jobs/${job.id}/edit`}>
                      <PenBoxIcon className="h-4 w-4 mr-1" /> Edit Job
                    </Link>
                  </DropdownMenuItem>
                  <CopyLinkMenuItem
                    jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${job.id}`}
                  />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/my-jobs/${job.id}/delete`}>
                      <XCircle className="h-4 w-4 mr-1 text-red-500" /> Delete
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyJobListing;
