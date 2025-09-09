"use client";

import { useState } from "react";
import { ProfilePage } from "./pages/profile-page";
import { CourseHistoryPage } from "./pages/course-history-page";
import { TripsHistoryPage } from "./pages/trips-history-page";
import { ShopHistoryPage } from "./pages/shop-history-page";
import { ChangePasswordPage } from "./pages/change-password-page";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { LogoutModal } from "../modals/logout-modal";

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
        <main className="flex-1 ml-[312px] p-6">{renderContent()}</main>
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
