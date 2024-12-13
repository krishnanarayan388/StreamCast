import PodcastCard from "@/components/Cards/PodcastCard";
import Layout from "@/components/Layout/Layout";
import VideoPodcastPlayer from "@/components/podcast/VideoPodcastPlayer";
import React from "react";

const index = ({ data, category }) => {
  return (
    <Layout>
      {/* Title -  Search Results for Category  */}
      {data?.length === 0 ? (
        <div className="text-white text-center  mt-20">
          <h1 className="text-3xl font-bold">
            No Podcasts for {category} category
          </h1>
        </div>
      ) : (
        <div className="mt-7">
          <h1 className="text-3xl font-bold text-white text-center ">
            Search results for {category} category{" "}
          </h1>
        </div>
      )}

      {/* Podcasts */}

      <div className="mt-12">
        <div className="flex flex-wrap justify-center lg:justify-start ">
          {data?.map((podcast) => (
            <div key={podcast._id} className="mb-5 mr-5">
              <PodcastCard podcast={podcast} />
            </div>
          ))}
        </div>

        {/* If data is [] then Show no popcasts for category {category} */}
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const fetchData = await fetch(
    `https://fipr-backend.onrender.com/api/podcast/get-podcast-bycategory/${params.name}`
  );
  const parsedData = await fetchData.json();

  return {
    props: {
      data: parsedData?.podcasts ? parsedData?.podcasts : null,
      category: params.name,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const object = {
    paths: [],
    fallback: false,
  };
  const allCategories = [
    "Sports",
    "Technology",
    "Entertainment",
    "Lifestyle",
    "Current affairs",
    "Comedy",
    "Comedy",
    "Business",
  ];

  allCategories?.map((e, i) => {
    object.paths.push({
      params: {
        name: e.toLowerCase(),
      },
    });
  });
  return object;
}

export default index;
