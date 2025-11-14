import React from "react";

import {
  Briefcase,
  Users,
  Zap,
  Eye,
  // Tooth,
  Heart,
  Umbrella,
  Clock,
  Calendar,
  Coins,
  Building,
  GraduationCap,
  Dumbbell,
  Brain,
  Home,
  Bitcoin,
  UserCircle,
  PieChart,
  MonitorOff,
  Shield,
  UserPlus,
  Plane,
  Presentation,
  HeartPulse,
  MicOff,
  Monitor,
  Globe,
  Code,
} from "lucide-react";
  
interface Benefit {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const benefits: Benefit[] = [
  { id: "Competitive salary", label: "Competitive salary", icon: <Briefcase className="w-3 h-3" /> },
  {
    id: "Meal allowance",
    label: "Meal allowance",
    icon: <Users className="w-3 h-3" />,
  },
  { id: "Flexible work hours", label: "Flexible work hours", icon: <Zap className="w-3 h-3" /> },
  {
    id: "Work-from-home support",
    label: "Work-from-home support",
    icon: <Eye className="w-3 h-3" />,
  },
 
  {
    id: "medical",
    label: "Medical insurance",
    icon: <Heart className="w-3 h-3" />,
  },
  {
    id: "unlimited_vacation",
    label: "Unlimited vacation",
    icon: <Umbrella className="w-3 h-3" />,
  },
  { id: "Health insurance (self + family)", label: "Health insurance (self + family)", icon: <Clock className="w-3 h-3" /> },
  {
    id: "four_day",
    label: "5 day workweek",
    icon: <Calendar className="w-3 h-3" />,
  },
  {
    id: "Gym membership",
    label: "Gym membership",
    icon: <Coins className="w-3 h-3" />,
  },
  {
    id: "Learning & development budget",
    label: "Learning & development budgets",
    icon: <Building className="w-3 h-3" />,
  },
  {
    id: "Flexible dress code",
    label: "Flexible dress code",
    icon: <Building className="w-3 h-3" />,
  },
  {
    id: "learning_budget",
    label: "Learning budget",
    icon: <GraduationCap className="w-3 h-3" />,
  },

  {
    id: "mental_wellness",
    label: "Mental wellness budget",
    icon: <Brain className="w-3 h-3" />,
  },

{
  id: "open_source",
  label: "Open source contribution time",
  icon: <Code className="w-3 h-3" />, // import { Code } from "lucide-react"
},
{
  id: "home_setup",
  label: "Home office setup budget",
  icon: <Home className="w-3 h-3" />,
},
{
  id: "remote_first",
  label: "Remote-first company",
  icon: <Globe className="w-3 h-3" />, // import { Globe } from "lucide-react"
},
{
  id: "latest_hardware",
  label: "Latest MacBook / hardware",
  icon: <Monitor className="w-3 h-3" />, // import { Monitor } from "lucide-react"
},
{
  id: "Provident Fund (PF)",
  label: "Provident Fund (PF)",
  icon: <MicOff className="w-3 h-3" />, // import { MicOff } from "lucide-react"
},

{
  id: "mental_health",
  label: "Mental health support",
  icon: <HeartPulse className="w-3 h-3" />, // import { HeartPulse } from "lucide-react"
},
{
  id: "Retirement benefits",
  label: "Retirement benefits",
  icon: <Presentation className="w-3 h-3" />, // import { Presentation } from "lucide-react"
},
{
  id: "Office gaming/recreation rooms",
  label: "Office gaming/recreation rooms",
  icon: <Plane className="w-3 h-3" />, // import { Plane } from "lucide-react"
},

  {
    id: "profit_sharing",
    label: "Profit sharing",
    icon: <PieChart className="w-3 h-3" />,
  },

  {
    id: "no_whiteboard",
    label: "No whiteboard interview",
    icon: <MonitorOff className="w-3 h-3" />,
  },
  {
    id: "no_monitoring",
    label: "No monitoring system",
    icon: <Shield className="w-3 h-3" />,
  },
  {
    id: "hire_old_young",
    label: "We hire old (and young)",
    icon: <UserPlus className="w-3 h-3" />,
  },
];