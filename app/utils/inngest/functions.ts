import { inngest } from "@/app/utils/inngest/client";
import { prisma } from "../db";
import { Resend } from "resend";
// export const helloWorld = inngest.createFunction(
//   { id: "hello-world" },
//   { event: "test/hello.world" },
//   async ({ event, step }) => {
//     await step.sleep("wait-a-moment", "1s");
//     return { message: `Hello ${event.data.email}!` };
//   },
// );
const resend = new Resend(process.env.RESEND_API_KEY!);
export const handleJobExpiration = inngest.createFunction(
  { id: "job-expiration" },
  { event: "job/created" },
  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    // Wait for the specified duration
    await step.sleep("wait-for-expiration", `${expirationDays}d`);

    // Update job status to expired
    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: { id: jobId },
        data: { status: "ExPIRED" },
      });
    });

    return { jobId, message: "Job marked as expired" };
  }
);

export const sendJobListingsEmail = inngest.createFunction(
  { id: "send-job-listings-email" },
  { event: "jobseeker/created" },
  async ({ event, step }) => {
    const { userId, email } = event.data;

    const totalsDays = 30;
    const intervalsDays = 2;
    let currentDay = 0;
    while (currentDay < totalsDays) {
      await step.sleep("wait-for-next-interval", `1m`);
      currentDay += intervalsDays;

      const recentJobs = await step.run("fetch-recent-jobs", async () => {
        return await prisma.jobPost.findMany({
          where: {
            status: "ACTIVE",
          },
          orderBy:{
            createdAt: "desc",  
          },
          take:10,
          include:{
            company:{
              select:{
                name:true,
                
              },
          }
        }
        });
      });
      if(recentJobs.length>0){
         await step.run("send-email",async()=>{
          const jobsListingHtml=recentJobs.map((job)=>{
            ` <div style="margin-bottom:20px; padding:10px; border:1px solid #ccc; border-radius:5px;">
             <h3> style="margin:0 0 10px 0;">${job.jobTitle}</h3>
              <p style="margin:0 0 5px 0;">Company: ${job.company.name}</p>
              <p style="margin:0 0 5px 0;">Location: ${job.location}</p>
              <p style="margin:0;">Posted on: ${job.salaryFrom.toLocaleString()}-${job.salaryTo.toLocaleString()}</p>
             </div>`
             
          }).join("");
          await resend.emails.send({
            from: 'onboarding@resend.dev',
            to:"ayushmishra270306@gmail.com",
            subject: 'Latest Job Listings Just for You!',
            html: `<div style="margin-bottom:20px; padding:10px; border:1px solid #ccc; border-radius:5px;">
            <h2>Latest Job Listings Just for You!</h2>
            ${jobsListingHtml}
             
             </div>`
          })
          })

         }};
        })
