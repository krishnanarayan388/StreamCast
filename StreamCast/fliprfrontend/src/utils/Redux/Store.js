import { configureStore, combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import PodcastSlice from './PodcastSlice';
import PodcastListSlice from './PodcastListSlice';
import FavPodcastSlice from './FavPodcastSlice';
import PlaylistSlice from './PlaylistSlice';

const rootReducer = combineReducers({
  UserSlice,
  PodcastSlice,
  PodcastListSlice,
  FavPodcastSlice,
  PlaylistSlice,
});

const Store = configureStore({
  reducer: rootReducer,
});



export default Store;
