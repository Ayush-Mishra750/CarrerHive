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
  { id: "401k", label: "401(k)", icon: <Briefcase className="w-3 h-3" /> },
  {
    id: "distributed",
    label: "Distributed team",
    icon: <Users className="w-3 h-3" />,
  },
  { id: "async", label: "Async", icon: <Zap className="w-3 h-3" /> },
  {
    id: "vision",
    label: "Vision insurance",
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
  { id: "pto", label: "Paid time off", icon: <Clock className="w-3 h-3" /> },
  {
    id: "four_day",
    label: "4 day workweek",
    icon: <Calendar className="w-3 h-3" />,
  },
  {
    id: "401k_matching",
    label: "401k matching",
    icon: <Coins className="w-3 h-3" />,
  },
  {
    id: "company_retreats",
    label: "Company retreats",
    icon: <Building className="w-3 h-3" />,
  },
  {
    id: "coworking_budget",
    label: "Coworking budget",
    icon: <Building className="w-3 h-3" />,
  },
  {
    id: "learning_budget",
    label: "Learning budget",
    icon: <GraduationCap className="w-3 h-3" />,
  },
  {
    id: "gym",
    label: "Free gym membership",
    icon: <Dumbbell className="w-3 h-3" />,
  },
  {
    id: "mental_wellness",
    label: "Mental wellness budget",
    icon: <Brain className="w-3 h-3" />,
  },
  {
    id: "home_office",
    label: "Home office budget",
    icon: <Home className="w-3 h-3" />,
  },
  {
    id: "crypto",
    label: "Pay in crypto",
    icon: <Bitcoin className="w-3 h-3" />,
  },
  {
  id: "learning_stipend",
  label: "Learning & development budget",
  icon: <GraduationCap className="w-3 h-3" />,
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
  id: "no_meetings",
  label: "No unnecessary meetings",
  icon: <MicOff className="w-3 h-3" />, // import { MicOff } from "lucide-react"
},
{
  id: "esops",
  label: "Equity / ESOPs",
  icon: <Coins className="w-3 h-3" />,
},
{
  id: "mental_health",
  label: "Mental health support",
  icon: <HeartPulse className="w-3 h-3" />, // import { HeartPulse } from "lucide-react"
},
{
  id: "conference_support",
  label: "Conference allowance",
  icon: <Presentation className="w-3 h-3" />, // import { Presentation } from "lucide-react"
},
{
  id: "workation",
  label: "Workation opportunities",
  icon: <Plane className="w-3 h-3" />, // import { Plane } from "lucide-react"
},

  {
    id: "pseudonymous",
    label: "Pseudonymous",
    icon: <UserCircle className="w-3 h-3" />,
  },
  {
    id: "profit_sharing",
    label: "Profit sharing",
    icon: <PieChart className="w-3 h-3" />,
  },
  {
    id: "equity",
    label: "Equity compensation",
    icon: <Coins className="w-3 h-3" />,
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