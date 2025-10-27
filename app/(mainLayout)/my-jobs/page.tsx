import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PenBoxIcon, XCircle, User2, Building2 } from "lucide-react";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EmptyState } from "@/components/ui/general/EmptyState";
import { CopyLinkMenuItem } from "@/components/ui/general/CopyLinkMenuItem";

async function getJobs(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: { company: { userId } },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      company: { select: { logo: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return data;
}

const MyJobListing = async () => {
  const session = await requireUser();
  const data = await getJobs(session.id as string);

  if (data.length === 0)
    return (
      <EmptyState
        title="No job posts found"
        description="You don't have any job posts yet"
        buttonText="Create a job post"
        href="/post-job"
      />
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            My Job Listings
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage and track all your job postings in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/post-job">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white ring-offset-2 ring-blue-200 dark:ring-blue-800">
              + Post New Job
            </Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="min-w-full table-fixed text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr className="text-left text-xs text-slate-500 dark:text-slate-300 uppercase">
                <th className="py-3 px-4 w-24">Logo</th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Posted On</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <td className="py-3 px-4 align-middle">
                    {job.company.logo ? (
                      <Image
                        src={job.company.logo}
                        alt={job.company.name}
                        width={44}
                        height={44}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <User2 className="w-5 h-5 text-slate-500 dark:text-slate-300" />
                      </div>
                    )}
                  </td>

                  {/* Job title: keep Link (navigates to job page) */}
                  <td className="py-3 px-4 align-middle font-medium text-slate-900 dark:text-slate-100">
                    <Link
                      href={`job/${job.id}`}
                      className="inline-block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                    >
                      {job.jobTitle}
                    </Link>
                  </td>

                  <td className="py-3 px-4 align-middle text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    {job.company.name}
                  </td>

                  <td className="py-3 px-4 align-middle">
                    <Badge
                      variant={
                        job.status === "ACTIVE"
                          ? "default"
                          : job.status.toUpperCase() === "EXPIRED"
                          ? "destructive"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {job.status.toLowerCase()}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 align-middle text-slate-600 dark:text-slate-400">
                    {job.createdAt.toLocaleString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  <td className="py-3 px-4 align-middle text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Open actions">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" sideOffset={8}>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/my-jobs/${job.id}/edit`} className="flex items-center gap-2">
                            <PenBoxIcon className="w-4 h-4" /> Edit Job
                          </Link>
                        </DropdownMenuItem>

                        <CopyLinkMenuItem jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${job.id}`} />

                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/my-jobs/${job.id}/delete`} className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-4 h-4" /> Delete Job
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list (stacked cards) */}
        <div className="md:hidden grid gap-3 p-3">
          {data.map((job) => (
            <div
              key={job.id}
              className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-start gap-3">
                {job.company.logo ? (
                  <Image
                    src={job.company.logo}
                    alt={job.company.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <User2 className="w-5 h-5 text-slate-500 dark:text-slate-300" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{job.jobTitle}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{job.company.name}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={job.status === "ACTIVE" ? "default" : "secondary"} className="capitalize text-xs">
                        {job.status.toLowerCase()}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Open actions">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${job.id}/edit`} className="flex items-center gap-2">
                              <PenBoxIcon className="w-4 h-4" /> Edit Job
                            </Link>
                          </DropdownMenuItem>

                          <CopyLinkMenuItem jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${job.id}`} />

                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${job.id}/delete`} className="flex items-center gap-2 text-red-600">
                              <XCircle className="w-4 h-4" /> Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                    Posted:{" "}
                    {job.createdAt.toLocaleString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>

                  <div className="mt-3">
                    <Link href={`job/${job.id}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View job details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MyJobListing;
