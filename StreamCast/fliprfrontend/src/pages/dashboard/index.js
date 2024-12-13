import Layout from "@/components/Layout/Layout";
import Dashboard from "@/components/dashboard";
import React from "react";

const index = () => {
  return (
    <Layout isLogin={1}>
      <Dashboard />
    </Layout>
  );
};

export default index;
