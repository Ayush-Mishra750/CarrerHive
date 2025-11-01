import { TrendingUp } from "lucide-react";

const stats = [
  { value: "5K+", label: "Active Jobs" },
  { value: "10K+", label: "Job Seekers" },
  { value: "100+", label: "Companies" },
  { value: "95%", label: "Success Rate" },
];

const Stats = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-2 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-center gap-2">
                <p className="text-4xl lg:text-5xl text-blue-600 font-bold">
                  {stat.value}
                </p>
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm  font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
