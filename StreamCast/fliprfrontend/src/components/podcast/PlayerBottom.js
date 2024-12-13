import React, { useEffect, useRef } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import { HeartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPodcast } from "@/utils/Redux/PodcastSlice";
import Image from "next/image";
import { RemoveFavoritePodcast, addToFavoritePodcast } from "@/actions/podcast";
import { setFavPodcasts } from "@/utils/Redux/FavPodcastSlice";
import PlaylistDialogBox from "../dashboard/PlaylistDialogBox";
import Link from "next/link";
import { toast } from "react-toastify";
import { getPlaylist } from "@/actions/playlist";

export default function PlayerBottom() {
  const podcast = useSelector((state) => state.PodcastSlice);
  const FavPodcasts = useSelector((state) => state.FavPodcastSlice);
  const UserData = useSelector((state) => state.UserSlice);
  const audio = useRef(null);
  const [audioisPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [openDialog, setopenDialog] = useState(false);


  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    audio.current.addEventListener("loadedmetadata", handleLoadedMetadata);
  }, [audio.current]);

  useEffect(() => {
    const currentPodcast = JSON.parse(localStorage.getItem("currentpodcast"));

    if (currentPodcast) {
      dispatch(setPodcast(currentPodcast));
      if (audio.current) {
        audio.current.currentTime = currentPodcast?.currentTime;
      }
      setCurrentTime(currentPodcast?.currentTime);
    } else {
      if (audio.current) {
        audio.current.currentTime = podcast?.currentTime;
      }
      setCurrentTime(podcast?.currentTime);
    }
  }, []);

  useEffect(() => {
    if (podcast?.isplaying && audio.current) {
      audio.current.play();
      setIsPlaying(true);
      setCurrentTime(podcast?.currentTime);
    }
  }, [podcast]);

  function handleTimeUpdate() {
    const locslStoragePodcast = JSON.parse(
      localStorage.getItem("currentpodcast")
    );
    if (audio.current) {
      setCurrentTime(audio.current.currentTime);
      localStorage.setItem(
        "currentpodcast",
        JSON.stringify({
          ...locslStoragePodcast,
          isplaying: audioisPlaying,
          currentTime: audio.current.currentTime,
        })
      );
    }
  }
  function handleLoadedMetadata() {
    if (audio.current) setDuration(audio.current.duration);
  }
  function handlePlayPause() {
    if (audioisPlaying) {
      setIsPlaying(false);
      audio.current.pause();
      localStorage.setItem(
        "currentpodcast",
        JSON.stringify({
          ...podcast,
          isplaying: false,
          currentTime: audio.current.currentTime,
        })
      );

      dispatch(
        setPodcast({
          ...podcast,
          isplaying: false,
        })
      );
    } else {
      setIsPlaying(true);
      audio.current.play();
      localStorage.setItem(
        "currentpodcast",
        JSON.stringify({
          ...podcast,
          isplaying: true,
          currentTime: audio.current.currentTime,
        })
      );
      dispatch(
        setPodcast({
          ...podcast,
          isplaying: true,
        })
      );
    }
  }
  function handleSeek(e) {
    const { value } = e.target;
    audio.current.currentTime = value;
    setCurrentTime(value);
    localStorage.setItem(
      "currentpodcast",
      JSON.stringify({
        ...podcast,
        isplaying: audioisPlaying,
        currentTime: value,
      })
    );
  }
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const dispatch = useDispatch();

  // Check Whether Podcast is in FavPodcasts
  const [isFav, setIsFav] = useState(
    FavPodcasts?.find((fav) => fav._id === podcast?._id)
  );

  const LikeCickHandler = async () => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (!User) {
      toast.error("Login to add to your favorite list");
      return;
    }
    if (!isFav) {
      setIsFav(true);
      addToFavoritePodcast({
        podcastId: podcast._id,
        userId: User._id,
      }).then((res) => {
        if (res.status == 200) {
          dispatch(setFavPodcasts([...FavPodcasts, podcast]));
        }
      });
    } else {
      setIsFav(false);
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
    <div className="fixed bottom-0 right-0 px-2 lg:px-10 py-3  bg-primary-800 border-primary-200 border-t-2 z-40 w-full  flex justify-between  text-white h-24 md:h-20">
      <audio ref={audio} src={podcast?.fileUrl} />
      <PlaylistDialogBox
        handleCancelButton={setopenDialog}
        openDialog={openDialog}
        title="Add to Playlist"
        ConfirmText="Add"
        podcastId={podcast?._id}
        playlists={playlists}
      />
      <div className="flex justify-start  md:w-1/2">
        <Image
          src={podcast.image}
          width={100}
          height={100}
          alt={podcast?.title}
          className="object-cover mr-2 rounded"
        />
        <div className="hidden md:flex flex-col justify-center ml-2">
          <h2 className="text-xl">{podcast.title}</h2>
          <p className="text-sm text-gray-300">By :- {podcast?.authorName}.</p>
        </div>
      </div>
      <div className="w-full flex md:justify-end md:flex-row flex-col  justify-between">
        <div className="md:hidden flex  justify-between">
          <div className="flex flex-col w-full ml-2 ">
            <h2 className="md:text-xl text-xs">{podcast.title}</h2>
            <p className="text-xs text-gray-300">{podcast?.authorName}</p>
          </div>
          <div className="md:hidden flex justify-center my-2">
            <div className="cursor-pointer mx-2" onClick={handlePlayPause}>
              {audioisPlaying
                ? React.createElement(PauseCircleIcon, {
                    className: `h-8 w-8`,
                    strokeWidth: 1,
                  })
                : React.createElement(PlayCircleIcon, {
                    className: `h-8 w-8`,
                    strokeWidth: 1,
                  })}
            </div>
            <HeartIcon
              className="h-8 w-8 cursor-pointer "
              color={isFav ? "red" : "white"}
              strokeWidth="1"
              onClick={LikeCickHandler}
              solid
            />
            <PlusCircleIcon
              className="h-8 w-8 cursor-pointer mx-1"
              color={"white"}
              strokeWidth="1"
              onClick={() => {
                if (!UserData) {
                  toast.error("Login to add to your playlist");
                  return;
                }
                setopenDialog(true);
              }}
              solid
            />
          </div>
        </div>
        <div className="md:my-2 md:w-full flex justify-center items-center">
          <div className="w-full  flex text-sm lg:text-md ">
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
          <div className="hidden md:flex justify-center my-2">
            <div className="cursor-pointer mx-1 ml-5" onClick={handlePlayPause}>
              {audioisPlaying
                ? React.createElement(PauseCircleIcon, {
                    className: `h-8 w-8`,
                    strokeWidth: 1,
                  })
                : React.createElement(PlayCircleIcon, {
                    className: `h-8 w-8`,
                    strokeWidth: 1,
                  })}
            </div>
            {!UserData ? (
              <Popover
                animate={{
                  mount: { scale: 1, y: -20 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="relative"
                style={{ zIndex: 9999 }}
              >
                <PopoverHandler>
                  <HeartIcon
                    className="h-8 w-8 cursor-pointer mx-1"
                    color={isFav ? "red" : "white"}
                    strokeWidth="1"
                  />
                </PopoverHandler>
                <PopoverContent
                  zIndex="9999"
                  className="bg-primary-200 border-0 text-white z-50 "
                >
                  <Link href={"/sign-in"}>
                    <p>Login to add this to Liked </p>
                  </Link>
                </PopoverContent>
              </Popover>
            ) : (
              <HeartIcon
                className="h-8 w-8 cursor-pointer mx-1"
                color={isFav ? "red" : "white"}
                strokeWidth="1"
                onClick={LikeCickHandler}
              />
            )}
            {!UserData ? (
              <Popover
                animate={{
                  mount: { scale: 1, y: -20 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="relative"
                style={{ zIndex: 9999 }}
              >
                <PopoverHandler>
                  <PlusCircleIcon
                    className="h-8 w-8 cursor-pointer mx-1"
                    color={"white"}
                    strokeWidth="1"
                  />
                </PopoverHandler>
                <PopoverContent
                  zIndex="9999"
                  className="bg-primary-200 border-0 text-white z-50 "
                >
                  <Link href={"/sign-in"}>
                    <p>Login to add this to Playlist </p>
                  </Link>
                </PopoverContent>
              </Popover>
            ) : (
              <PlusCircleIcon
                className="h-8 w-8 cursor-pointer mx-1"
                color={"white"}
                strokeWidth="1"
                onClick={() => setopenDialog(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
