"use client"
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Building2, Search } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { useState } from 'react'


const CompanyCard = ({companies}) => {
    const [searchCompany,setSearchCompany]=useState("");
    // const filteredCompany=companies.filter((company: { toLowercase: () => string | string[]; location: string; })=>
    //     company.toLowercase().includes(searchCompany.toLowerCase())||
    //  company.location.toLowerCase().includes(searchCompany.toLowerCase())

    // )

  return (
    <main className="container mx-auto px-4 py-8">
{/* //       {/* Header */}
       <div className="mb-8">
         <div className="flex items-center gap-3 mb-4">
           <Building2 className="h-8 w-8 text-primary" />
           <h1 className="text-4xl font-bold">Explore Companies</h1>
      </div>
         <p className="text-muted-foreground text-lg">
           Discover top companies and find your next career opportunity
         </p>
       </div>

       {/* Search and Filters */}
       <div className="mb-8 space-y-4">
         <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
           <Input
            placeholder="Search companies by name, industry, or location..."
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {companies.length}
          </span>{" "}
          companies
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4 gap-2">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  className="h-12 w-12 object-contain mr-1"
                  width={50}
                  height={50}
                />
              ) : (
                <div className="h-12 w-12 bg-muted flex items-center justify-center rounded mr-4">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div></div>

              <h2 className="text-lg font-semibold">{company.name}</h2>
              <Badge className="  text-sm text-muted-foreground">
                {company.location}
              </Badge>
            </div>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}

export default CompanyCard
