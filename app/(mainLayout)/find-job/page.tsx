
import { JobFilters } from "@/components/ui/general/jobFilter";
import JobListings from "@/components/ui/general/JobListings";
// import { JobListings } from "@/components/ui/general/JobListings";
import JobListingsLoading from "@/components/ui/general/JobListingsLoading";
import { Suspense } from "react";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function FindJob({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(",") || [];
  const location = params.location || "";

  const filterKey = `page=${currentPage};types=${jobTypes.join(
    ","
  )};location=${location}`;

  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-0">

    
      <div className="order-1 lg:order-1 lg:col-span-1">
        <JobFilters />
      </div>

      {/* Job Listings */}
      <div className="order-2 lg:order-2 lg:col-span-2 flex flex-col gap-6">
        <Suspense key={filterKey} fallback={<JobListingsLoading />}>
          <JobListings
            currentPage={currentPage}
            jobTypes={jobTypes}
            location={location}
          />
        </Suspense>
      </div>
    </div>
  );
}
