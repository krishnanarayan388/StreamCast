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

const CategoryCard = ({ item }) => {
  return (
    <Link href={`/podcast/category/${item?.name.toLowerCase()}`}>
    <div className=" shadow-lg rounded-lg overflow-hidden p-3 w-32 md:w-40  cursor-pointer border podcastCard    ">
      <div className="relative pb-24 lg:pb-32 rounded-md overflow-hidden  ">
        
        <Image
          className="absolute inset-0 h-full w-full object-cover ImageBox opacity-60   "
          src={item?.image}
          alt={item?.name}
          width={500}
          height={500}
        />
        <div
          className="text-md lg:text-xl font-bold flex items-center justify-center  text-white absolute"
          style={{
            Zindex: 999,
            width: "100%",
            height: "100%",
          }}
        >
          {item?.name}
        </div>
      </div>

      {/* Icon */}
    </div>
    </Link>
  );
};

export default CategoryCard;
