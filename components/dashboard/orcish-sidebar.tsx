"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  LayoutDashboard, 
  LifeBuoy, 
  BarChart3, 
  FolderKanban, 
  Users, 
  Database, 
  FileText, 
  PenTool, 
  MoreHorizontal,
  Settings, 
  HelpCircle,
  Plus,
  X,
  Menu
} from "lucide-react";

const navigation = [
  {
    title: "Main Navigation",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Lifecycle",
        href: "/dashboard/lifecycle",
        icon: LifeBuoy,
      },
      {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        name: "Projects",
        href: "/dashboard/projects",
        icon: FolderKanban,
      },
      {
        name: "Team",
        href: "/dashboard/team",
        icon: Users,
      },
    ]
  },
  {
    title: "Documents",
    items: [
      {
        name: "Data Library",
        href: "/dashboard/data-library",
        icon: Database,
      },
      {
        name: "Reports",
        href: "/dashboard/reports",
        icon: FileText,
      },
      {
        name: "Word Assistant",
        href: "/dashboard/word-assistant",
        icon: PenTool,
      },
      {
        name: "More",
        href: "/dashboard/more",
        icon: MoreHorizontal,
      },
    ]
  },
  {
    title: "Other",
    items: [
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        name: "Get Help",
        href: "/dashboard/help",
        icon: HelpCircle,
      },
    ]
  },
];

export function OrcishSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const allNavItems = navigation.flatMap(section => section.items);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        toggleMobileMenu();
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isMobile) {
          toggleMobileMenu();
        } else {
          setIsCollapsed(!isCollapsed);
        }
      }
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const newIndex = Math.max(0, Math.min(allNavItems.length - 1, focusedIndex + direction));
        setFocusedIndex(newIndex);
      }
      
      if (e.key === 'Enter' && focusedIndex >= 0) {
        const item = allNavItems[focusedIndex];
        if (item) {
          window.location.href = item.href;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, isCollapsed, focusedIndex]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setFocusedIndex(-1);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}
      
      {/* Sidebar */}
      <div className={`flex h-full flex-col bg-gray-50 border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} ${
        isMobile ? (isMobileMenuOpen ? 'fixed left-0 top-0 z-50' : 'fixed -left-full') : ''
      }`}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
        {!isCollapsed && (
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Orcish Dashboard
            <StatusBadge status="success" variant="subtle" size="sm" icon={false}>
              Pro
            </StatusBadge>
          </h1>
        )}
        <button
          onClick={() => {
            if (isMobile) {
              toggleMobileMenu();
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={isMobile ? (isMobileMenuOpen ? 'Close menu' : 'Open menu') : (isCollapsed ? 'Expand sidebar' : 'Collapse sidebar')}
        >
          {isMobile ? (
            isMobileMenuOpen ? <X className="h-4 w-4 text-gray-600" /> : <Menu className="h-4 w-4 text-gray-600" />
          ) : (
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* Quick Create Button */}
      {!isCollapsed && (
        <div className="px-4 pt-4">
          <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white transition-all duration-200 hover:scale-105">
            <Plus className="mr-2 h-4 w-4" />
            Quick Create
          </Button>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-4 py-6 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.title}>
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const isActive = pathname === item.href;
                const globalIndex = navigation.slice(0, navigation.indexOf(section)).reduce((acc, s) => acc + s.items.length, 0) + itemIndex;
                const isFocused = focusedIndex === globalIndex;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      isActive
                        ? "bg-gray-200 text-gray-900 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      isFocused && "ring-2 ring-primary ring-offset-2"
                    )}
                    title={isCollapsed ? item.name : undefined}
                    aria-label={`${item.name} ${isActive ? '(current page)' : ''}`}
                    tabIndex={isCollapsed ? -1 : 0}
                    onFocus={() => setFocusedIndex(globalIndex)}
                    onBlur={() => setFocusedIndex(-1)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    {isActive && !isCollapsed && (
                      <span className="ml-auto w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                shadcn
              </p>
              <p className="text-xs text-gray-500 truncate">
                m@example.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    
    {/* Mobile Menu Button */}
    {isMobile && (
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-30 p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
    )}
    </>
  );
}
