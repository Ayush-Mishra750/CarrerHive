
// import { Badge } from "@/components/ui/badge";
// import { prisma } from "@/app/utils/db";
// import { Input } from "@/components/ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
// // import { SelectValue } from '@radix-ui/react-select'
// import {  Building2, Search } from "lucide-react";
// import Image from "next/image";
// import React, { useState } from "react";

// const getCompanies = async () => {
//   return await prisma.company.findMany({
//     select: {
//       id: true,
//       name: true,
//       location: true,
//       logo: true,
//       website: true,
//     },
//   });
// };

// const page =  () => {
//   const companies =  getCompanies();
  
// const [searchCompany, setSearchCompany] = useState("");
//    const filteredCompany=companies.filter(item=>
//     item.toLowerCase().includes?.(searchCompany.toLowerCase())
//   )
 


//   return (
//    
//   );
// };

// export default page;


import { prisma } from '@/app/utils/db'
import React from 'react'
import CompanyCard from './companyCard'

const CompanyPage = async() => {
  const companies=  await prisma.company.findMany({
    select:{
      id:true,  
      name:true,
      location:true,
      logo:true,
      website:true,
    }
  })
  return (
    <div>
      <CompanyCard companies={companies}/>
    </div>
  )
}

export default CompanyPage
