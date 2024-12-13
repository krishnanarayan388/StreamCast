import Layout from "@/components/Layout/Layout";
import CreatePodcastPage from "@/components/dashboard/CreatePodcast";
import React from "react";

const index = () => {
  return (
    <Layout isLogin={1}>
      <CreatePodcastPage />
    </Layout>
  );
};

export default index;
