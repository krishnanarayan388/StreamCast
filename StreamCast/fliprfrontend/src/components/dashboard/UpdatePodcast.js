import {
  createPodcastInDatabase,
  deletePodcastInDatabase,
  updatePodcastInDatabase,
} from "@/actions/podcast";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

const UpdatePodcast = ({ podcastData }) => {
  const Router = useRouter();
  const [podcastInputData, setPodcastInputData] = useState(podcastData);
  const [Loading, setLoading] = useState({
    imageUploading: false,
    fileUploading: false,
    podcastCreating: false,
  });

  const inputChangeHandler = (e) => {
    setPodcastInputData({
      ...podcastInputData,
      [e.target.name]: e.target.value,
    });
  };

  //   Discadr change handler
  const discardChangesHandler = () => {
    setPodcastInputData(podcastData);
  };
  const deletePodcastHandler = async () => {
    deletePodcastInDatabase(podcastData._id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        Router.push("/dashboard");
      }
    });
  };

  const UpdatePodcastHandler = (e) => {
    e.preventDefault();

    if (podcastInputData.title == "") {
      toast.error("Please enter title");
      return;
    }
    if (podcastInputData.description == "") {
      toast.error("Please enter description");
      return;
    }
    if (podcastInputData.image == "") {
      toast.error("Please upload image");
      return;
    }
    if (podcastInputData.category == "") {
      toast.error("Please select category");
      return;
    }
    if (podcastInputData.type == "file" && podcastInputData.fileUrl == "") {
      toast.error("Please upload file");
      return;
    }
    setLoading({
      ...Loading,
      podcastCreating: true,
    });

    updatePodcastInDatabase(podcastInputData, podcastData._id).then((res) => {
      if (res.error) {
        toast.error(res.message);
        setLoading({
          ...Loading,
          podcastCreating: false,
        });
        return;
      }
      if (res.status == 200) {
        toast.success(res.message);
        setLoading({
          ...Loading,
          podcastCreating: false,
        });
      }
    });
  };

  const uploadImageHandler = async (e) => {
    // e.preventDefault();

    setLoading({
      ...Loading,
      imageUploading: true,
    });
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "https://fipr-backend.onrender.com/api/upload/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        setLoading({
          ...Loading,
          imageUploading: false,
        });
      }
      setPodcastInputData({
        ...podcastInputData,
        image: response.data.url,
      });
    } catch (error) {
      console.log("error while uploading media :- ", error);
      toast.error("Unable to upload image");
      setLoading({
        ...Loading,
        imageUploading: false,
      });
    }

    // fetch("https://fipr-backend.onrender.com/api/upload/upload-image", {
    //   method: "PUT",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setPodcastInputData({
    //       ...podcastInputData,
    //       image: data.url,
    //     });
    //   }).catch((err)=>{
    //     console.log(err);
    //   }
    //   );
  };

  const uploadFileHandler = async (e) => {
    setLoading({
      ...Loading,
      fileUploading: true,
    });
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "https://fipr-backend.onrender.com/api/upload/upload-image",
        formData
      );
      setPodcastInputData({
        ...podcastInputData,
        fileUrl: response.data.url,
      });
      if (response) {
        setLoading({
          ...Loading,
          fileUploading: false,
        });
      }
    } catch (error) {
      console.log("error while uploading media :- ", error);
      setLoading({
        ...Loading,
        fileUploading: false,
      });
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setPodcastInputData({
        ...podcastInputData,
        authorName: userData.name,
        userId: userData._id,
      });
    } else {
      Router.push("/sign-in");
    }
  }, []);

  return (
    <div className="container mx-auto my-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Create a Podcast</h1>
        <TrashIcon
          className="h-6 w-6 text-red lg:mr-5"
          color="red"
          onClick={deletePodcastHandler}
        />
      </div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={UpdatePodcastHandler}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Enter podcast title"
            required
            value={podcastInputData?.title}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            placeholder="Enter podcast description"
            required
            value={podcastInputData?.description}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image Upload
          </label>
          {Loading?.imageUploading ? (
            <div className=" w-10 h-10  loader mt-2 mb-2 "></div>
          ) : null}
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              Loading?.imageUploading ? "hidden" : ""
            } `}
            id="file"
            name="file"
            type="file"
            placeholder="Upload podcast image"
            required
            onChange={uploadImageHandler}
          />
          <Image
            src={podcastInputData.image}
            width={200}
            height={200}
            alt="Podcast Image"
            className="ImageBox"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            required
            value={podcastInputData?.category}
            onChange={inputChangeHandler}
          >
            <option value="">Select category</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Current affairs">Current affairs</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Comedy">Comedy</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <div className="flex items-center mb-2">
            <input
              className="mr-2 leading-tight"
              type="radio"
              name="type"
              value="audio"
              checked={podcastInputData.type === "audio"}
              onChange={inputChangeHandler}
            />
            <span className="text-sm">Audio</span>
          </div>

          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              type="radio"
              name="type"
              value="video"
              checked={podcastInputData.type === "video"}
              onChange={inputChangeHandler}
            />
            <span className="text-sm">Video</span>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            File Upload
          </label>
          {Loading?.fileUploading ? (
            <div className=" w-10 h-10  loader mt-2 mb-2 "></div>
          ) : null}
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              Loading?.fileUploading ? "hidden" : ""
            }`}
            id="file"
            name="file"
            type="file"
            placeholder="Upload podcast file"
            required
            onChange={uploadFileHandler}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={UpdatePodcastHandler}
          >
            {Loading?.uploading ? (
              <div
                className="loader ml-5 mr-5"
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "0 50px",
                }}
              ></div>
            ) : (
              "Update Podcast"
            )}
          </button>

          {/* Discard Chnages button */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={discardChangesHandler}
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePodcast;
