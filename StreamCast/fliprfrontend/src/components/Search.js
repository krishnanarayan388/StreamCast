import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AllPodcastSection from "./Homepage/AllPodcastSection";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const {
    query: { title },
  } = router;

  const [AllPodcasts, setAllPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPodcasts = async () => {
    try {
      const data = await axios.get(
        `https://fipr-backend.onrender.com/search-podcast/${title}`
      );
      if (data) {
        // console.log(data.data.podcasts);
        if (data.data.podcasts.length === 0) {
          setIsLoading(false);
        }
        setAllPodcasts(data.data.podcasts);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
    
  };

  useEffect(() => {
    getPodcasts();
  }, [title]);

  return (
    <div>
      <div className="text-2xl my-10 text-white">
        Showing Results for {title}
      </div>
      {AllPodcasts.length === 0 && !isLoading ? (
        <div className="text-white text-center pt-12 text-lg ">
          No Podcasts Found
        </div>
      ) :  <AllPodcastSection AllPodcasts={AllPodcasts} />}

      {isLoading?<div className="loader"></div>:null}
     
    </div>
  );
};

export default Search;
