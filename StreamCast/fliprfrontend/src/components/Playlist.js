import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AllPodcastSection from "./Homepage/AllPodcastSection";
import { useRouter } from "next/router";
import Playlistrow from "./Plalylistrow";
import PlayerBottom from "./podcast/PlayerBottom";

const Playlist = ({ data }) => {
  const router = useRouter();
  const podcast = useSelector((state) => state.PodcastSlice);
  

  useEffect(() => {
    if (!data) {
      // router.push("/404");
    }
  }, []);

  return (
    <div>
      <div className="text-2xl mt-5 mb-2 text-white">{data?.title}</div>
      <div className="text-gray-500">{data?.authorName}</div>
      {data?.podcasts?.length > 0 ? (
        <Playlistrow AllPodcasts={data?.podcasts} playlistId={data?._id} />
      ) : (
        <div className="text-white text-center pt-12 text-lg ">No Podcasts</div>
      )}
      {podcast && <PlayerBottom />}
    </div>
  );
};

export default Playlist;
