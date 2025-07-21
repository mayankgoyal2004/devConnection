import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import { base_url } from "../utils/baseUrl";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async function () {
    try {
      const response = await axios.get(base_url + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No feed found. Please check back later.
      </div>
    );

  return (
    feed && (
      <div>
        <FeedCard user={feed[0]} fetchFeed={fetchFeed} />
      </div>
    )
  );
};

export default Feed;
