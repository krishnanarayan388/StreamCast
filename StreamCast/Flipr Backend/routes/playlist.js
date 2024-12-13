const express = require("express");
const { getPlaylistByUserId, createPlaylist, addPodcastToPlaylist, removePodcastFromPlaylist, getAllPlayLists, getPlaylistById } = require("../controllers/playlist");
const router = express();

router.get('/get-playlists/:userId',getPlaylistByUserId);
router.get('/get-all-playlist',getAllPlayLists)
router.get('/get-single-playlist/:id',getPlaylistById)
router.post('/create-playlist', createPlaylist);
router.put('/add-to-playlist', addPodcastToPlaylist);
router.delete('/remove-from-playlist', removePodcastFromPlaylist);




module.exports = router;
