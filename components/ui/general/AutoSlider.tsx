"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"


  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Spotify",
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Amazon",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Netflix",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=100&fit=crop",
    },
    {
      id: 6,
      name: "Instagram",
      logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=100&fit=crop",
    },
    {
      id: 7,
      name: "Tesla",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    },
    {
      id: 8,
      name: "IBM",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=100&fit=crop",
    },
  ];

export function CarouselDemo() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )


  return (
      <Carousel
      
      plugins={[plugin.current]}
      className="w-full "
    //   onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      >
     <CarouselContent className=" md:-ml-3">
            {companies.map((company, index) => (
              <CarouselItem
                key={index}
                className=" md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/3"
              >
                <Card  className="flex  flex-col justify-center items-center">
                 
                    <Image
                      src={company.logo}
                      alt={company.name}
                      height={100}
                      width={100}
                      
                    />
                    <h3 className="text-sm font-semibold text-gray group-hover:text-blue-600 text-center">
                      {company.name}
                    </h3>
                 
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
   
    </Carousel>
  )
}
