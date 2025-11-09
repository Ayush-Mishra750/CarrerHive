
// import { JobFilters } from "@/components/ui/general/jobFilter";
// import JobListings from "@/components/ui/general/JobListings";
// // import { JobListings } from "@/components/ui/general/JobListings";
// import JobListingsLoading from "@/components/ui/general/JobListingsLoading";
// import { Suspense } from "react";

// type SearchParamsProps = {
//   searchParams: Promise<{
//     page?: string;
//     jobTypes?: string;
//     location?: string;
//   }>;
// };

// export default async function Home({ searchParams }: SearchParamsProps) {
//   const params = await searchParams;
//   const currentPage = Number(params.page) || 1;
//   const jobTypes = params.jobTypes?.split(",") || [];
//   const location = params.location || "";

//   // Create a composite key from all filter parameters
//   const filterKey = `page=${currentPage};types=${jobTypes.join(
//     ","
//   )};location=${location}`;

//   return (
//     <div className="grid grid-cols-3 gap-8">
//       <JobFilters />
//       <div className="col-span-2 flex flex-col gap-6">
//         <Suspense key={filterKey} fallback={<JobListingsLoading />}>
//           <JobListings
//             currentPage={currentPage}
//             jobTypes={jobTypes}
//             location={location}
//           />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

import Features from '@/components/mainPage/Feature'
import Footer from '@/components/mainPage/Footer'
import Hero from '@/components/mainPage/Hero'
import Stats from '@/components/mainPage/stats'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <Features/>
      <Stats/>
      <Footer/>
      
    </div>
  )
}

export default HomePage;
