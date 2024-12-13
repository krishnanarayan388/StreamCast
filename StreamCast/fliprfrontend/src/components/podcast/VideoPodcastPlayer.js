import React, { useEffect, useRef, useState } from "react";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setFavPodcasts } from "@/utils/Redux/FavPodcastSlice";
import { RemoveFavoritePodcast, addToFavoritePodcast } from "@/actions/podcast";
import PlaylistDialogBox from "../dashboard/PlaylistDialogBox";
import Link from "next/link";
import { getPlaylist } from "@/actions/playlist";

const VideoPodcastPlayer = ({ podcast }) => {
  const dispatch = useDispatch()

  const audio = useRef(null);
  const UserData = useSelector((state) => state.UserSlice);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const FavPodcasts = useSelector((state) => state.FavPodcastSlice);
  const [openDialog, setopenDialog] = useState(false);
  

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    audio.current.addEventListener("loadedmetadata", handleLoadedMetadata);
  }, [audio.current]);
  useEffect(() => {
    if (audio.current) {
      audio.current.play();
      setIsPlaying(true);
      audio.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, []);
  function handleTimeUpdate() {
    if (audio.current) setCurrentTime(audio.current.currentTime);
  }
  function handleLoadedMetadata() {
    if (audio.current) setDuration(audio.current.duration);
  }
  function handlePlayPause() {
    if (isPlaying) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setIsPlaying(!isPlaying);
  }
  function handleSeek(e) {
    const { value } = e.target;
    audio.current.currentTime = value;
    setCurrentTime(value);
  }
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  const toggleFullScreen = () => {
    if (audio.current.requestFullscreen) {
      audio.current.requestFullscreen();
    } else if (audio.current.webkitRequestFullscreen) { /* Safari */
      audio.current.webkitRequestFullscreen();
    } else if (audio.current.msRequestFullscreen) { /* IE11 */
      audio.current.msRequestFullscreen();
    }
  }


  // Favorite podcast
  let isFav = FavPodcasts?.find((fav) => fav._id === podcast?._id);
  const LikeCickHandler = async () => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (!isFav) {
      isFav = true;
      addToFavoritePodcast({
        podcastId: podcast._id,
        userId: User._id,
      }).then((res) => {
        if (res.status == 200) {
          dispatch(setFavPodcasts([...FavPodcasts, podcast]));
        }
      });
    } else {
      isFav = false;
      dispatch(
        setFavPodcasts(FavPodcasts.filter((fav) => fav._id !== podcast._id))
      );
      RemoveFavoritePodcast({
        podcastId: podcast._id,
        userId: User._id,
      });
    }
  };



  const [playlists, setplaylists] = useState([
  ]);

  useEffect(() => {
    if (!UserData) return;
    getPlaylist(UserData?._id).then((res) => {
      setplaylists(res.data);
    });
  }, [UserData]);

  return (
    <div>
      <PlaylistDialogBox handleCancelButton={setopenDialog} openDialog={openDialog} title='Add to Playlist' ConfirmText='Add' podcastId={podcast?._id} playlists={playlists} />
      <div
        className={`flex justify-center my-2  ${isPlaying ? " " : "md:opacity-20"
          }`}
      >
        <video ref={audio} src={podcast.fileUrl} className="md:w-3/4 w-full" />
      </div>
      <div className="relative">
        <div className="my-2 flex justify-center items-center bottom-10 text-white text-md">
          <span>{formatTime(currentTime)}</span>
          <input
            className="w-full mx-2 bg-gray-300 rounded-full overflow-hidden"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex justify-center my-2">
          <div className="cursor-pointer mx-2" onClick={handlePlayPause}>
            {isPlaying
              ? React.createElement(PauseCircleIcon, {
                className: `h-10 w-10 text-white`,
                strokeWidth: 1,
              })
              : React.createElement(PlayCircleIcon, {
                className: `h-10 w-10 text-white `,
                strokeWidth: 1,
              })}
          </div>
          <HeartIcon
            className="h-10 w-10 cursor-pointer "
            color={isFav ? "red" : "white"}
            strokeWidth="1"
            onClick={LikeCickHandler}

          />
          <PlusCircleIcon
            className="h-10 w-10 cursor-pointer mx-1"
            color={"white"}
            strokeWidth="1"
            onClick={() => setopenDialog(true)}
          />
          <ArrowsPointingOutIcon onClick={toggleFullScreen} strokeWidth="1" className="ml-2 h-10 w-10 cursor-pointer" color="white"  />
          
        </div>
        <div className="md:hidden w-full">
          <div>
            <h2 className="text-2xl text-white">{podcast.title}</h2>
            <Link href={`/podcast/category/${podcast?.category}`}>
            <p className="text-sm text-primary-100  ">#{podcast?.category}</p></Link>
            <p className=" text-gray-600">{podcast.authorName}</p>
            <p className="mt-4 text-white">{podcast.description}.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center absolute top-20 text-gray-400">
        {!isPlaying && (
          <div className="hidden md:flex justify-between p-2 px-4">
            <div>
              <h2 className="text-2xl">{podcast.title}</h2>
              <p className="mt-2 text-gray-600">{podcast.authorName}</p>
              <p className="mt-4">{podcast.description}.</p>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default VideoPodcastPlayer;
