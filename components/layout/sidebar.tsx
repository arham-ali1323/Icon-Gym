"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut,
  Dumbbell,
  Target,
  Utensils,
  Clock,
  DollarSign,
  Image,
  CalendarDays,
  UserCheck
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: "Membership",
    href: "/user/membership",
    icon: CreditCard,
    current: false,
  },
  {
    name: "Workouts",
    href: "/user/workouts",
    icon: Dumbbell,
    current: false,
  },
  {
    name: "Diet Plans",
    href: "/user/diet",
    icon: Utensils,
    current: false,
  },
  {
    name: "Attendance",
    href: "/user/attendance",
    icon: Clock,
    current: false,
  },
  {
    name: "Payments",
    href: "/user/payments",
    icon: DollarSign,
    current: false,
  },
  {
    name: "Profile",
    href: "/user/profile",
    icon: UserCheck,
    current: false,
  },
];

const adminNavigation = [
  {
    name: "Admin Dashboard",
    href: "/admin/analytics",
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: "Members",
    href: "/admin/members",
    icon: Users,
    current: false,
  },
  {
    name: "Trainers",
    href: "/admin/trainers",
    icon: Target,
    current: false,
  },
  {
    name: "Membership Plans",
    href: "/admin/plans",
    icon: CreditCard,
    current: false,
  },
  {
    name: "Workout Plans",
    href: "/admin/workouts",
    icon: Dumbbell,
    current: false,
  },
  {
    name: "Diet Plans",
    href: "/admin/diets",
    icon: Utensils,
    current: false,
  },
  {
    name: "Attendance",
    href: "/admin/attendance",
    icon: Clock,
    current: false,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: DollarSign,
    current: false,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: Image,
    current: false,
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: CalendarDays,
    current: false,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const currentNavigation = isAdmin ? adminNavigation : navigation;

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <div className="flex items-center space-x-2">
          <Dumbbell className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold">FitGym</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {currentNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
