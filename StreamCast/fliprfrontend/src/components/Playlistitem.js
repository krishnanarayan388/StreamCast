import {
    MusicalNoteIcon,
    PlayIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { setPodcast } from "@/utils/Redux/PodcastSlice";
import { useRouter } from "next/navigation";
import { incrementPodcastViews } from "@/actions/podcast";
import { TrashIcon } from "@heroicons/react/24/solid";
import { removePodcastFromPlaylist } from "@/actions/playlist";
import { toast } from "react-toastify";

const Playlistitem = ({ podcast, index ,playlistId }) => {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const openPodcast = () => {
        dispatch(
            setPodcast({
                ...podcast,
                currentTime: 0,
                isplaying: true,
            })
        );
        localStorage.setItem(
            "currentpodcast",
            JSON.stringify({
                ...podcast,
                currentTime: 0,
                isplaying: true,
            })
        );
    };

    const redirectPodcast = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            incrementPodcastViews({
                podcastId: podcast?._id,
                userId: user?._id
            })
        }
        push(`/podcast/${podcast?._id}`);
    };

    const deletePodcastFromPlaylistHandler = () => {
        setIsDeleting(true);
        removePodcastFromPlaylist({
            playlistId: playlistId,
            podcastId: podcast?._id
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setIsDeleting(false);
                // Reload the page
                window.location.reload();

            }else{
                setIsDeleting(false);
                toast.error('Something went wrong');
            }
        }
        )

    }



    return (
        <div className="flex items-center overflow-hidden px-0 w-full h-16  cursor-pointer border-b-2 border-primary-100  ">
            <div className="mr-4 text-white">{index + 1}.</div>
            <div className="relative mr-5 flex items-center">
                <Image
                    className="object-cover ImageBox rounded-full h-10 w-10"
                    src={podcast?.image}
                    alt={podcast?.title}
                    width={40}
                    height={40}
                />
            </div>
            <div className="text-xs md:text-md md:font-bold text-white w-1/6">
                {podcast?.title}
            </div>
            <div className="text-white hidden md:block  text-xs mr-auto ml-2">
                {podcast?.description.length > 52
                    ? podcast?.description.slice(0, 52) + "..."
                    : podcast?.description}
            </div>
            <div className="flex ml-auto items-center">
                {isDeleting?<div className="loader " style={{
                    width: "35px",
                    height: "35px",
                    marginRight: "0.5rem",
                }}></div>:<TrashIcon className="h-6 w-6 text-white mr-4" onClick={deletePodcastFromPlaylistHandler} />}
                
                <div className="bg-white w-6 h-6 rounded-full justify-center items-center flex">
                    {podcast?.type === "audio" ? (
                        <MusicalNoteIcon color="black" width={18} />
                    ) : (
                        <VideoCameraIcon color="black" width={18} />
                    )}
                </div>
                <button className="bg-green-600 w-10 h-10 ml-4 rounded-full flex justify-center items-center">
                    <PlayIcon
                        color="white"
                        width={28}
                        onClick={podcast?.type === "audio" ? openPodcast : redirectPodcast}
                    />
                </button>
            </div>
                    
                    

        </div>
    );
};

export default Playlistitem;
