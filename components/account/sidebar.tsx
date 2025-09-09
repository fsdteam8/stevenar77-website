"use client";

import {
  User,
  Lock,
  BookOpen,
  MapPin,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export function Sidebar({ activeTab, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "change-password", label: "Changes Password", icon: Lock },
    { id: "course-history", label: "Course History", icon: BookOpen },
    { id: "trips-history", label: "Trips History", icon: MapPin },
    { id: "shop-history", label: "Shop History", icon: ShoppingBag },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];

  return (
    <aside className="fixed left-0 top-[52px] w-[312px] h-[calc(100vh-52px)] bg-white border-r border-[#e6e7e6] z-10">
      <div className="p-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Image
            width={120}
            height={120}
            src="/images/logo.png"
            alt="Logo"
            className="object-contain h-[62px] w-[62px]"
          />
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isLogout = item.id === "logout";

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer",
                  isActive && !isLogout && "sidebar-active",
                  !isActive && !isLogout && "text-[#68706a] hover:bg-[#f8f9fa]",
                  isLogout && "text-[#e5102e] hover:bg-[#feecee]"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
