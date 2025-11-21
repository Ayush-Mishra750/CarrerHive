
// // import { Badge } from "@/components/ui/badge";
// // import { prisma } from "@/app/utils/db";
// // import { Input } from "@/components/ui/input";
// // // import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
// // // import { SelectValue } from '@radix-ui/react-select'
// // import {  Building2, Search } from "lucide-react";
// // import Image from "next/image";
// // import React, { useState } from "react";

import Image from "next/image";

// // const getCompanies = async () => {
// //   return await prisma.company.findMany({
// //     select: {
// //       id: true,
// //       name: true,
// //       location: true,
// //       logo: true,
// //       website: true,
// //     },
// //   });
// // };

// // const page =  () => {
// //   const companies =  getCompanies();
  
// // const [searchCompany, setSearchCompany] = useState("");
// //    const filteredCompany=companies.filter(item=>
// //     item.toLowerCase().includes?.(searchCompany.toLowerCase())
// //   )
 


// //   return (
// //    
// //   );
// // };

// // export default page;


// import { prisma } from '@/app/utils/db'
// import React from 'react'
// import CompanyCard from './companyCard'

// const CompanyPage = async() => {
//   const companies=  await prisma.company.findMany({
//     select:{
//       id:true,  
//       name:true,
//       location:true,
//       logo:true,
//       website:true,
//     }
//   })
//   return (
//     <div>
//       {companies.map((company) => (
//         <CompanyCard key={company.id} {...company} />
//       ))}
//     </div>
//   )
// }

// export default CompanyPage




export default function AboutSection() {
  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
            Your Path to the <span className="text-primary">Perfect Job</span> Starts Here
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            We connect talented job seekers with top companies worldwide. Whether you&apos;re looking for full-time roles, remote opportunities, or internships, our platform helps you discover opportunities that truly match your skills and career goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-md transition-all text-center">
              <h3 className="text-3xl font-bold text-primary">10k+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Active Jobs</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-md transition-all text-center">
              <h3 className="text-3xl font-bold text-primary">5k+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Companies</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-md transition-all text-center">
              <h3 className="text-3xl font-bold text-primary">50k+</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Job Seekers</p>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <Image
          width={50}
          height={50}
            src="https://illustrations.popsy.co/red/work-from-home.svg"
            alt="Job portal illustration"
            className="w-72 sm:w-96 lg:w-[420px] drop-shadow-lg dark:brightness-90 dark:contrast-125"
          />
        </div>
      </div>
    </section>
  );
}
