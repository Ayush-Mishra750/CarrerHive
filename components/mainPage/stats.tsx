// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import  { CarouselDemo } from "../ui/general/AutoSlider";
import { prisma } from "@/app/utils/db";
import Autoplay from "embla-carousel-autoplay";

const TrustedCompanies = async () => {
 
  const jobs = await prisma.jobPost.findMany({
    where: { status: "ACTIVE" },
    include: { company: true },
    take: 8,
  });
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Trusted by Leading Companies
          </h2>
          <p className="text-muted-foreground">
            Join thousands of professionals at top organizations
          </p>
        </div>

        <div className="width-full ">
          <CarouselDemo  
      />
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;

// import AutoSlider from "@/components/AutoSlider";
// import { prisma } from "@/app/utils/db";

// export default async function HomePage() {

// }
