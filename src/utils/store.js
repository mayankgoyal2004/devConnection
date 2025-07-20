import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userslice";
import feedReducer from "./feedslice";
import connectionReducer from "./connections"
import requestReducer from "./requestslice"

const Store = configureStore({
  reducer: {
    user: UserReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request:requestReducer,
  },
});

export default Store;
