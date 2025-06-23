"use client";

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import DashboardHome from "../../components/DashboardHome/DashboardHome";
import MyDonations from "../../components/MyDonations/MyDonations";
import CreateDonation from "../../components/CreateDonation/CreateDonation";
import ReceivedRequests from "../../components/ReceivedRequests/ReceivedRequests";
import Profile from "../../components/Profile/Profile";

export default function DonorDashboardPage() {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <DashboardHome
            userType="donor"
            onCreateDonation={() => setActiveSection("create")}
            onMydonation={() => setActiveSection("donations")}
          />
        );
      case "donations":
        return (
          <MyDonations onCreateDonation={() => setActiveSection("create")} />
        );
      case "create":
        return <CreateDonation onBack={() => setActiveSection("home")} />;
      case "requests":
        return <ReceivedRequests />;
      case "profile":
        return <Profile userType="donor" />;
      default:
        return (
          <DashboardHome
            userType="donor"
            onCreateDonation={() => setActiveSection("create")}
          />
        );
    }
  };

  return (
    <DashboardLayout
      userType="donor"
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
