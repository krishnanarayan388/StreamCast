import Layout from "@/components/Layout/Layout";
import VideoPodcastPlayer from "@/components/podcast/VideoPodcastPlayer";
import React from "react";

const index = ({ data }) => {
  return (
    <Layout metaTitle={data?.title} metaDesc={data?.desc} >
      {data?.fileUrl ? <VideoPodcastPlayer podcast={data} /> : null}
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const fetchData = await fetch(
    `https://fipr-backend.onrender.com/api/podcast/get-allpodcasts`
  );
  const parsedData = await fetchData.json();

  let data = {};
  parsedData?.podcasts?.map((e, i) => {
    if (e._id == params.id) {
      data = e;
    }
  });
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const object = {
    paths: [],
    fallback: "blocking",
  };
  const data = await fetch(
    `https://fipr-backend.onrender.com/api/podcast/get-allpodcasts`
  );
  const parsedData = await data.json();

  parsedData?.podcasts?.map((e, i) => {
    object.paths.push({
      params: {
        id: e._id,
      },
    });
  });
  return object;
}

export default index;
