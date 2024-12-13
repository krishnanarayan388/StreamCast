import Layout from "@/components/Layout/Layout";
import Playlist from "@/components/Playlist";
import React from "react";

const playlist = ({ data }) => {
  return (
    <Layout  >
      <Playlist data={data} />
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const fetchData = await fetch(
    `https://fipr-backend.onrender.com/api/playlist/get-single-playlist/${params.id}`
  );
  const parsedData = await fetchData.json();

  return {
    props: {
      data: parsedData,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const object = {
    paths: [],
    fallback: true,
  };
  const data = await fetch(
    `https://fipr-backend.onrender.com/api/playlist/get-all-playlist`
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

export default playlist;
