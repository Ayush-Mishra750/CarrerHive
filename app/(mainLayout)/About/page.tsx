
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




export default function AboutPage() {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-neutral-900 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Heading Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
            About <span className="text-primary">CareerHive</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Helping job seekers and companies connect in the most efficient and meaningful way.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <Image
          width={50}
          height={50}
             src="/mnt/data/90de8963-99e3-474f-9e18-caca67de13a9.png"
            alt="Mission"
            className="w-72 sm:w-96 lg:w-[380px] dark:brightness-90 dark:contrast-125"
          />

          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              CareerHive is dedicated to simplifying the hiring journey by empowering 
              both job seekers and companies. From discovering job opportunities to 
              building strong professional connections — we make it easier, faster, 
              and more reliable.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-sm text-center hover:shadow-lg transition-all">
            <h3 className="text-4xl font-extrabold text-primary">20k+</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Active Job Listings</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-sm text-center hover:shadow-lg transition-all">
            <h3 className="text-4xl font-extrabold text-primary">12k+</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Companies Hiring</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-sm text-center hover:shadow-lg transition-all">
            <h3 className="text-4xl font-extrabold text-primary">150k+</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Job Seekers</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-10">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center">
            What We Believe In
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Transparency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clear and trusted communication during the hiring process.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Constant improvement and smarter solutions for job search.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Trust
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building a reliable environment for companies & job seekers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
