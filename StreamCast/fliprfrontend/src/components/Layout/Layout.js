import { useDispatch } from "react-redux";
import ComplexNavbar from "./Navbar";
import { useEffect } from "react";
import { getUserFavoritePodcasts } from "@/actions/podcast";
import { setFavPodcasts } from "@/utils/Redux/FavPodcastSlice";
import { setPodcast } from "@/utils/Redux/PodcastSlice";
import { getPlaylist } from "@/actions/playlist";
import { setPlaylist } from "@/utils/Redux/PlaylistSlice";
import { useRouter } from "next/router";
import { setUser } from "@/utils/Redux/UserSlice";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children , isLogin ,metaTitle ,  metaDesc }) {
  const dispatch = useDispatch();
  const Router = useRouter();


  const updateCurrentPlaying = () => {
    const currentPlaying = JSON.parse(localStorage.getItem("currentpodcast"));
    dispatch(setPodcast(currentPlaying));
  };

  const getPlaylistHandler = (userData) => {
    getPlaylist(userData?._id).then((res) => {
      if (res.status == 200) {
        dispatch(setPlaylist(res.data));
      }
    });
  };


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(setUser(userData))
      getUserFavoritePodcasts(userData._id).then((res) => {
        if (res.status == 200) {
          dispatch(setFavPodcasts(res.data?.podcasts?.favourites));
          // create an array of fav podcasts Id and then set it to local storage

        }
      });
      getPlaylistHandler(userData);
    } else {
      dispatch(setFavPodcasts([]));
      if (isLogin) {
        Router.push("/sign-in");
      }
      dispatch(setUser(null))
    }
    updateCurrentPlaying();
  }, []);

  return (
    <div className="pageContainer">
      <Head>
        <title>{metaTitle || "BuzzTalk" }</title>
        <meta name="description" content={metaDesc||"BuzzTalk allows users to listen to both audio and video podcasts. Users can search for their desired podcast, view a list of the most popular podcasts on the main dashboard, and mark podcasts as favorites for easy access later.Create playlists and with curated podcasts, Additionally, users can resume playback of a podcast from where they left off if they need to pause it"} />
        <link rel="icon" href="https://flipr-hackathon-project.vercel.app/_next/static/media/logo.dccf45df.svg" />
        
        
      </Head>
      <ComplexNavbar />
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
