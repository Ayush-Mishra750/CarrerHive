import { savedJobPost, unSavedJobPost } from "@/app/action";
import arcject, { detectBot } from "@/app/utils/arcject";
import { auth } from "@/app/utils/auth";
import { getFlagEmoji } from "@/app/utils/countryList";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listOfBenefits";
import { jobListingDurationPricing } from "@/app/utils/pricingTiers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonToHtml } from "@/components/ui/general/JSONtoHtml";
import { GeneralSubmitButton, SaveJobButton } from "@/components/ui/general/SubmitButton";
import { fixedWindow, request } from "@arcjet/next";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const aj=arcject.withRule(
  detectBot({
    mode:"LIVE",
    allow:["CATEGORY:SEARCH_ENGINE","CATEGORY:PREVIEW"]
  })
).withRule(
  fixedWindow({
    mode:"LIVE",
  max:10,
  window:"60s"
  })
)

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
        createdAt: true,
        listingDuration: true,
        company: {
          select: {
            name: true,
            website: true,
            location: true,
            about: true,
            logo:true
          },
        },
      },
    }),
    userId
      ? prisma.savedJobPost.findUnique({
          where: {
            userId_jobId: {
              jobId,
              userId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);
  if (!jobData) {
    return notFound();
  }
  return { jobData, savedJob };
};
type Params = Promise<{ jobId: string }>;

const JobPageId = async ({ params }: { params: Params }) => {
  const req=await request();
  const decision= await aj.protect(req);
  if(decision.isDenied()){
    throw new Error("Invalid Id ")
  }

  const { jobId } = await params;
  const session = await auth();
  const { jobData, savedJob } = await getData(jobId, session?.user?.id);
  console.log(jobData, savedJob);
  const loactionFlag = getFlagEmoji(jobData.location);
  

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="space-y-6 col-span-2">
        {/* {header} */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-2xl"> <Image
             src={
              jobData.company.logo??
                `https://avatar.vercel.sh/${jobData.company.name}`
             }
             className="rounded-full size-25"
             alt={jobData.company.name}
             height={50}
             width={50}/>{jobData.jobTitle}</h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{jobData.company.name}</p>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge className="rounded-full text-white">
                {jobData.employmentType}
              </Badge>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge variant="secondary" className="rounded-full text-white">
                {loactionFlag} {jobData.location}
              </Badge>
            </div>
          </div>
          {session?.user ? (
              <form
                action={
                  savedJob
                    ? unSavedJobPost.bind(null, savedJob.id)
                    : savedJobPost.bind(null, jobId)
                }
              >
                <SaveJobButton savedJob={!!savedJob} />
              </form>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">
                  <Heart className="size-4 mr-2" />
                  Save Job
                </Link>
              </Button>
            )}
        </div>

        <section>
          <h3 className="font-semibold text-lg mb-4">Job Description</h3>
          <div className="text-muted-foreground leading-7">
            <JsonToHtml json={JSON.parse(jobData.jobDescription)} />
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-4 text-xl">
            Benefits{" "}
            <span className="text-sm text-muted-foreground font-normal">
              (blue is offered and red is not offered)
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = jobData.benefits.includes(benefit.id);
              return (
                <Badge
                  key={benefit.id}
                  variant={isOffered ? "default" : "secondary"}
                  className={`text-sm px-4 py-1.5 rounded-full ${
                    !isOffered && " opacity-75 cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      <div>
        <Card className="mt-6 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
          <div className="space-y-5 text-center">
            {/* Heading */}
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.1.9-2 2-2h4v2m0 0v2h-4a2 2 0 01-2-2zm0 0H8a2 2 0 00-2 2v4m0 0v2h4a2 2 0 002-2v-4z"
                />
              </svg>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 ">
                Apply Now
              </h3>
            </div>

            {/* Message */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Let <span className="font-semibold">{jobData.company.name}</span>{" "}
              know <span className="font-bold text-red-500">CareerHive</span>{" "}
              brought you here — together we connect talent!
            </p>

            {/* Apply Form */}
            <form className="flex flex-col items-center gap-3 mt-3 ">
              <input type="hidden" name="jobId" value={jobId} />
           <GeneralSubmitButton text="Apply Now" />
            </form>
          </div>
        </Card>

        {/* job details card  */}
        <Card className="mt-6 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
          <div className="space-y-4 text-center">
            {/* Title */}
            <h3 className="font-semibold text-lg flex items-center justify-center gap-2 text-slate-800 dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10m-12 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2zm12 5h.01M6 19h.01"
                />
              </svg>
              About the Job
            </h3>

            {/* Apply Before Section */}
            <div>
              <span className="text-sm text-muted-foreground block">
                Apply Before
              </span>
              <span className="inline-block mt-2 px-4 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded-full border border-blue-100 dark:border-blue-800">
                {new Date(
                  jobData.createdAt.getTime() +
                    jobData.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Optional motivational line */}
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3">
              Don’t wait too long — applying early increases your chances!
            </p>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Posted on</span>
            <span className="text-sm">
              {jobData.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* employment Type */}
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Employment Type
            </span>

            <span className=" px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded-full border border-blue-100 dark:border-blue-800">
              {jobData.employmentType}
            </span>
          </div>
          {/* location */}
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Location
            </span>

            <span className=" px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded-full border border-blue-100 dark:border-blue-800">
              {jobData.location}
            </span>
          </div>
        </Card>

        {/* company card */}
        <Card className="mt-6 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
  <div className="space-y-5 text-center">
    {/* Company Logo */}
    <div className="flex justify-center">
      <Image
        src={
          jobData.company.logo ??
          `https://avatar.vercel.sh/${jobData.company.name}`
        }
        alt={jobData.company.name}
        height={70}
        width={70}
        className="rounded-full  border border-slate-200 dark:border-slate-700 shadow-sm"
        sizes="20"
      />
    </div>

    {/* Company Info */}
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        {jobData.company.name}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 max-w-md mx-auto leading-relaxed">
        {jobData.company.about}
      </p>
    </div>

    {/* Company Page Button */}
    {jobData.company.website && (
      <Link href={jobData.company.website} target="_blank">
        <Button className="mt-3 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 transition-all duration-300">
          Visit Company Page
        </Button>
      </Link>
    )}
  </div>
</Card>

      </div>
    </div>
  );
};

export default JobPageId;
