"use server";

import z from "zod";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchema";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "./utils/hooks";
import arcjet, { detectBot, shield } from "./utils/arcject";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { jobListingDurationPricing } from "./utils/pricingTiers";
import { inngest } from "./utils/inngest/client";
import { revalidatePath } from "next/cache";


const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();
  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Request denied by security policy");
  }
  const user = await requireUser();
  const validatedData = companySchema.parse(data);
  console.log("validate", validatedData);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validatedData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();
  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Request denied by security policy");
  }
  const validatedData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validatedData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  const validatedData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name || undefined,
    });

    stripeCustomerId = customer.id;

    // Update user with Stripe customer ID
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      companyId: company.id,
      jobDescription: validatedData.jobDescription,
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      listingDuration: validatedData.listingDuration,
      benefits: validatedData.benefits,
    },
  });

  // Trigger the job expiration function
  await inngest.send({
    name: "job/created",
    data: {
      jobId: jobPost.id,
      expirationDays: validatedData.listingDuration,
    },
  });

  // Get price from pricing tiers based on duration
  const pricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validatedData.listingDuration
  );

  if (!pricingTier) {
    throw new Error("Invalid listing duration selected");
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting - ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              "https://pve1u6tfz1.ufs.sh/f/Ae8VfpRqE7c0gFltIEOxhiBIFftvV4DTM8a13LU5EyzGb2SQ",
            ],
          },
          currency: "USD",
          unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      jobId: jobPost.id,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
}

export async function savedJobPost(jobId: string) {

  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("User not authenticated");
  }
   const data=await prisma.savedJobPost.create({
    data: {
      jobId: jobId,
      userId: user.id as string,
    },
  });
  revalidatePath(`/job/${data.jobId}`);
   
}

export async function unSavedJobPost(savedJobPostId:string){
   const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("User not authenticated");
  }
  const data=await prisma.savedJobPost.delete({
    where:{
      id:savedJobPostId,
      userId:user?.id ,
    },
    select:{
      jobId:true
    }
  })

  revalidatePath(`/job/${data.jobId}`);
  
}
export async function updateJobPost(data:z.infer<typeof jobSchema>,jobId:string){

  const user =await requireUser();
  if(!user){
    throw new Error("Invalid user");
  }
  const validatedData=jobSchema.parse(data);
  await prisma.jobPost.update({
    where:{
      id:jobId,
      company:{
        userId:user.id,
      }
    },
    data:{
        jobDescription: validatedData.jobDescription,
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      listingDuration: validatedData.listingDuration,
      benefits: validatedData.benefits,
    }
  });
  return redirect("/my-jobs");

}

export async function deleteJobPost(jobId:string){
  const user=await requireUser();
  const req=await request();
  const decision=await aj.protect(req);
  if(decision.isDenied()){
    throw new Error("only valid user  delete the post");
  }
  if(!user){
    throw new Error("user not authenticated")
  }
  await prisma.jobPost.delete({
    where:{
      id:jobId,
      company:{
        userId:user.id,
      }
    },
   
  });
  redirect("/my-jobs")

}