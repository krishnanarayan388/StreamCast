import Image from "next/image";
import { Inter } from "next/font/google";
import Homepage from "@/components/Homepage/Homepage";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/Redux/UserSlice";
import Layout from "@/components/Layout/Layout";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ AllPodcasts, popularityPodcasts }) {
  const dispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get(
      `https://fipr-backend.onrender.com/auth/user`,
      {
        withCredentials: true,
      }
    );
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
    } else {
      localStorage.removeItem("user");
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout >
      <div className="">
        <Homepage
          AllPodcasts={AllPodcasts}
          popularityPodcasts={popularityPodcasts}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://fipr-backend.onrender.com/api/podcast/get-allpodcasts`
  );
  const data = await res.json();

  const res2 = await fetch(
    `https://fipr-backend.onrender.com/api/podcast/get-podcast-bypopularity`
  );
  const data2 = await res2.json();

  // Pass data to the page via props
  return {
    props: { AllPodcasts: data?.podcasts, popularityPodcasts: data2?.podcasts },
  };
}
