import PlayerBottom from "@/components/podcast/PlayerBottom";
import { useState } from "react";
import { useSelector } from "react-redux";
import AllPodcastSection from "./AllPodcastSection";
import CategorySection from "./CategorySection";
import PlaylistSection from "./PlaylistSection";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Homepage = ({ AllPodcasts, popularityPodcasts }) => {
  const podcast = useSelector((state) => state.PodcastSlice);
  const AllFavPodcasts = useSelector((state) => state.FavPodcastSlice);
  const Playlist = useSelector((state) => state.PlaylistSlice);

  return (
    <div className="">
      <AllPodcastSection AllPodcasts={AllPodcasts} title={"All Podcasts"} />
      {AllFavPodcasts.length > 0 ? (
        <AllPodcastSection AllPodcasts={AllFavPodcasts} title="Favourites" />
      ) : null}
      {Playlist.length > 0 ? (
        <PlaylistSection AllPlaylist={Playlist} title={"My Playlists"} />
      ) : null}
      <CategorySection />
      {popularityPodcasts.length > 0 ? (
        <AllPodcastSection AllPodcasts={popularityPodcasts} title="Popular" />
      ) : null}
      {podcast && <PlayerBottom />}
    </div>
  );
};

export default Homepage;
