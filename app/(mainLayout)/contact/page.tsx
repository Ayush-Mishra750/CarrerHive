import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-neutral-900 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
            About <span className="text-primary">CareerHive</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            CareerHive connects job seekers with companies worldwide, making hiring
            simpler, faster, and more meaningful.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Illustration */}
          <Image
          width={50}
          height={50}

            src="https://illustrations.popsy.co/red/team-goals.svg"
            alt="About CareerHive"
            className="w-72 sm:w-96 lg:w-[420px] mx-auto dark:brightness-90 dark:contrast-125"
          />

          {/* Right Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Who We Are
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We are a modern job platform dedicated to connecting top talent with
              companies that value skills, passion, and dedication. Whether you&apos;re a
              fresh graduate or a working professional, CareerHive empowers you to find
              the right opportunities effortlessly.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl font-bold">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Smart job matching to find roles tailored to your skills.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-primary text-xl font-bold">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Verified employers and authentic job listings.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-primary text-xl font-bold">•</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Support for both job seekers and recruiters.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl text-center bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-4xl text-primary font-extrabold">20k+</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Active Jobs</p>
          </div>

          <div className="p-6 rounded-2xl text-center bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-4xl text-primary font-extrabold">12k+</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Companies</p>
          </div>

          <div className="p-6 rounded-2xl text-center bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-4xl text-primary font-extrabold">150k+</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Job Seekers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
