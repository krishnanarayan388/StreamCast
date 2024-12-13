import {
  MusicalNoteIcon,
  PlayIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { setplaylist } from "@/utils/Redux/PlaylistSlice";
import { useRouter } from "next/navigation";
// import { incrementplaylistViews } from "@/actions/playlist";

const PlaylistCard = ({ playlist }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  return (
    <Link href={`/playlist/${playlist._id}`}>
      <div className="shadow-lg rounded-lg overflow-hidden p-4 w-40 h-52  cursor-pointer border  playlistCard bg-primary-800 border-primary-100  ">
        <div className="relative pb-32  rounded-md overflow-hidden  ">
          <Image
            className="absolute inset-0 h-full w-full object-cover flex ImageBox rounded-full"
            src={
              playlist?.podcasts.length
                ? playlist?.podcasts[0].image
                : "https://res.cloudinary.com/ompra/image/upload/v1682278220/rbjqrzwhzlv33bacyxgd.jpg"
            }
            alt={playlist?.title}
            width={600}
            height={600}
          />
        </div>
        {/* Play button icon */}
        {/* <button className=" bg-green-600 w-10 h-10 rounded-full flex justify-center items-center absolute postCastPlayBtn ">
        <PlayIcon
          color="white"
          width={30}
          onClick={playlist?.type === "audio" ? openplaylist : redirectplaylist}
        />
      </button> */}

        {/* Icon */}

        <div>
          <div className="text-md font-bold mb-1 mt-2 text-white">
            {playlist?.title}
          </div>
          <div className=" mb-2 text-gray-400 text-xs ml-1   ">
            {playlist?.authorName || "Unknown"}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
