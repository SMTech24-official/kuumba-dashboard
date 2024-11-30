import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import ProtectedRoute from "@/components/ui/ProtectedRoute/ProtectedRoute";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProtectedRoute roles={["ADMIN"]}>
        <DashboardLayout>{children}</DashboardLayout>
      </ProtectedRoute> 
    </>
  );
};

export default layout;
