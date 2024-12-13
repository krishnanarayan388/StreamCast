import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Radio,
} from "@material-tailwind/react";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import {
  addPodcastToPlaylist,
  createPlaylistInDatabase,
  getAllPlaylists,
  getPlaylist,
} from "@/actions/playlist";
import { getPodcastByUser } from "@/actions/podcast";
import { toast } from "react-toastify";

export default function PlaylistDialogBox({
  title,
  message,
  openDialog,
  handleOkayButton,
  handleCancelButton,
  ConfirmText,
  CancelText,
  podcastId,
  playlists,
}) {
  const [open, setOpen] = useState(true);
  const [currplayistId, setPLaylistId] = useState("");
  const [newPlaylist, setNewPlaylist] = useState("");
  const [isPlaylistCreating, setIsPlaylistCreating] = useState(false);
  const user = useSelector((state) => state.UserSlice);


  const handlePlaylistChange = (e) => {
    setNewPlaylist(e.target.value);
    setPLaylistId(null);
  };

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  

  const handleCancel = () => {
    setOpen(false);
    handleCancelButton(false);
  };

  const addToPlaylist = () => {
    if (!currplayistId && !newPlaylist) {
      alert("Please select or create a playlist");
      return;
    }
    const User = JSON.parse(localStorage.getItem("user"));
    setIsPlaylistCreating(true);
    if (currplayistId) {
      addPodcastToPlaylist({
        playlistId: currplayistId,
        podcastId,
      }).then((res) => {
        if (res.status == 200) {
          toast.success("Podcast added to playlist");
          setOpen(false);
        }
        setIsPlaylistCreating(false);
      });
    } else {
      createPlaylistInDatabase({
        title: newPlaylist,
        authorName: User?.name,
        userId: User?._id,
        podcastId,
      }).then((res) => {
        if (res.status == 201) {
          toast.success("Podcast added to playlist");
          setOpen(false);
        }
        setIsPlaylistCreating(false);
      });
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        handler={handleOkayButton}
        className="bg-primary-800 "
        // Dynamic size
      >
        <DialogHeader className="text-white border-none">{title}</DialogHeader>
        <DialogBody>
          <div className="flex mb-5">
            <Input
              className="border-1 text-white border-primary-100 "
              variant="static"
              placeholder="Create New playlist"
              value={newPlaylist}
              onChange={handlePlaylistChange}
            />
          </div>
          <div className="flex flex-col">
            {playlists?.map((item, index) => (
              <div className="flex items-center mb-2" key={index}>
                <input
                  className="mr-2 leading-tight text-white"
                  type="radio"
                  name="type"
                  value={item._id}
                  onChange={(e) => {
                    setPLaylistId(e.target.value);
                    setNewPlaylist("");
                  }}
                  checked={currplayistId === item._id}
                  color="red"
                />
                <span className="text-sm text-white">{item?.title}</span>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1"
          >
            <span>{!CancelText ? "Cancel" : CancelText}</span>
          </Button>
          <Button variant="gradient" color="green" onClick={addToPlaylist}>
            {isPlaylistCreating ? (
              <div
                className="loader w-8 h-8 "
                style={{
                  height: "22px",
                  width: "22px",
                  margin: "0px 8px",
                }}
              ></div>
            ) : (
              <span>{!ConfirmText ? "Confirm" : ConfirmText}</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
