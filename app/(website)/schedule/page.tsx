import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import AvailableSessionsPage from "@/components/website/schedule/ScheduleCalender";
import UpcomingFetured from "@/components/website/schedule/UpcomingFetured";
import React from "react";

const page = () => {
  return (
    <div>
      <AvailableSessionsPage />
      <UpcomingFetured />
      <StillHaveQuestion />
    </div>
  );
};

export default page;
