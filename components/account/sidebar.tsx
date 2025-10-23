"use client";

import {
  User,
  Lock,
  BookOpen,
  MapPin,
  // ShoppingBag,
  LogOut,
  Menu,
  ShoppingBasket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useIsMobile from "@/services/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export function Sidebar({ activeTab, onNavigate }: SidebarProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "change-password", label: "Change Password", icon: Lock },
    { id: "course-history", label: "Course History", icon: BookOpen },
    { id: "trips-history", label: "Trips History", icon: MapPin },
    { id: "order-history", label: "Order History", icon: ShoppingBasket},
    // { id: "shop-history", label: "Shop History", icon: ShoppingBag },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];

  const handleNavigate = (tab: string) => {
    onNavigate(tab);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="p-6 ">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Link href="/">
          <Image
            src={"/images/logo.png"}
            alt=""
            width={200}
            height={200}
            className="w-[65px] h-[62px] rounded-full object-cover"
          />
        </Link>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isLogout = item.id === "logout";

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-colors",
                isActive && !isLogout && "sidebar-active",
                !isActive && !isLogout && "text-[#68706a] hover:bg-[#f8f9fa]",
                isLogout && "text-[#e5102e] hover:bg-[#feecee]",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-2 left-4 z-50 md:hidden bg-white shadow-md"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="hidden md:block fixed left-0 top-[52px] w-[408px] h-[calc(100vh-52px)] bg-white border-r border-[#e6e7e6] z-10">
      <SidebarContent />
    </aside>
  );
}
