"use client";

import Link from "next/link";
import { MapPin, User2 } from "lucide-react";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Image from "next/image";
import { Card, CardHeader } from "../card";
import { Badge } from "../badge";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

interface AppProps {
  job: {
    id: string;
    jobTitle: string;
    salaryFrom: number;
    salaryTo: number;
    employmentType: string;
    location: string;
    createdAt: Date;
    company: {
      logo: string | null;
      name: string;
      about: string;
      location: string;
    };
  };
}

export function JobCard({ job }: AppProps) {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary relative p-4 sm:p-6">
        <CardHeader className="p-0">
          {/* Main Flex */}
          <div className="flex flex-col md:flex-row md:items-start gap-4 w-full">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              {job.company.logo ? (
                <Image
                  src={job.company.logo}
                  alt={job.company.name}
                  width={48}
                  height={48}
                  className="size-12 sm:size-14 rounded-lg object-cover"
                />
              ) : (
                <div className="bg-red-500 size-12 sm:size-14 rounded-lg flex items-center justify-center">
                  <User2 className="size-6 text-white" />
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex flex-col flex-grow gap-1 text-start">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug break-words">
                {job.jobTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <p className="text-muted-foreground">{job.company.name}</p>

                <Badge className="rounded-full" variant="secondary">
                  {job.employmentType}
                </Badge>

                <Badge className="rounded-full text-white">
                  {job.location}
                </Badge>

                <p className="text-muted-foreground">
                  {formatCurrency(job.salaryFrom)} - {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>

            {/* Right Side (Location + Time) */}
            <div className="flex flex-col items-start md:items-end gap-2 md:ml-auto w-full md:w-auto">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <MapPin className="size-4" />
                <h1 className="font-semibold whitespace-nowrap">{job.location}</h1>
              </div>

              <Badge className="rounded-full text-white text-xs sm:text-sm">
                {formatRelativeTime(job.createdAt)}
              </Badge>
            </div>
          </div>

          {/* Company About */}
          <div className="mt-4">
            <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 leading-relaxed">
              {job.company.about}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}