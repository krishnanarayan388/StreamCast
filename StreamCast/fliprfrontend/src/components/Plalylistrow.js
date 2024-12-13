import React from "react";
import PodcastCard from "./Cards/PodcastCard";
import Slider from "react-slick";
import Playlistitem from "./Playlistitem";
import index from "@/pages/dashboard/createpodcast";

const Playlistrow = ({ AllPodcasts, playlistId }) => {
    
    return (
        <>
            <div className="pb-10   " style={{ width: "100%" }}>
                <div className="mt-5">

                    {AllPodcasts?.map((podcast,index) => (
                        <div key={podcast._id}>
                            <div className="mb-2 mr-5 flex justify-center items-center ">
                                <Playlistitem podcast={podcast} index={index} playlistId={playlistId} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Playlistrow;
