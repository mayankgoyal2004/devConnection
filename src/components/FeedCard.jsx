import axios from "axios";
import { base_url } from "../utils/baseUrl";

const FeedCard = ({ user, fetchFeed }) => {
  const changeFeed = async function (status, userId) {
    try {
      await axios.post(
        base_url + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      fetchFeed();
    } catch (err) {
      console.error(err);
    }
  };
 

  if (!user) return;

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card w-96 bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
        <figure className="h-60 overflow-hidden">
          {user.photos && (
            <img
              src={user.photos}
              alt="User image "
              className="w-full h-full object-fit"
            />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold text-gray-800">
            {user.firstName + " " + user.lastName}
          </h2>
          {user.about && <p className="text-gray-600 text-sm">{user.about}</p>}
          <div className="flex justify-end items-center  ">
            {user.age && <p>{user.age}</p>}
            {user.gender && <p>{user.gender}</p>}
          </div>
          <div className="mt-4 flex justify-center items-center">
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => changeFeed("ignored", user._id)}
                className="btn btn-outline btn-sm hover:btn-error"
              >
                Ignore
              </button>
              <button
                onClick={() => changeFeed("interested", user._id)}
                className="btn btn-primary btn-sm"
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
