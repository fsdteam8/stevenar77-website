"use client";

import { useState } from "react";

import { LogoutModal } from "@/components/modals/logout-modal";
import { ProfilePage } from "./pages/profile-page";
import { CourseHistoryPage } from "./pages/course-history-page";
import { TripsHistoryPage } from "./pages/trips-history-page";
import { ShopHistoryPage } from "./pages/shop-history-page";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { ChangePasswordPage } from "./pages/change-password-page";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavigation = (tab: string) => {
    if (tab === "logout") {
      setShowLogoutModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfilePage />;
      case "course-history":
        return <CourseHistoryPage />;
      case "trips-history":
        return <TripsHistoryPage />;
      case "shop-history":
        return <ShopHistoryPage />;
      case "change-password":
        return <ChangePasswordPage />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onNavigate={handleNavigation} />
        <main className="flex-1 ml-0 md:ml-[408px] p-4 sm:p-6 pt-16 md:pt-6">
          {renderContent()}
        </main>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          // Handle logout logic here
        }}
      />
    </div>
  );
}
