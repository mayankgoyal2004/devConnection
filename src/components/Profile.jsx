import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import axios from "axios";
import { addUser } from "../utils/userslice";
import { base_url } from "../utils/baseUrl";

export default function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photos, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [showtost, setshowtost] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      const response = await axios.patch(
        base_url + "/profile/update",
        {
          firstName,
          lastName,
          age: Number(age),
          gender,
          photos,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data.data));
      setshowtost(true);
      setTimeout(() => {
        setshowtost(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photos || "");
    }
  }, [user]);

  return (
    user && (
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-6 min-h-screen bg-gradient-to-r from-gray-100 to-white">
        {/* Profile Form Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2 text-indigo-600">
            Your Profile
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Update your details
          </p>

          {error && (
            <div className="text-red-600 text-sm text-center mb-3 capitalize">
              {error + " Please try again"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={photos}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-3">
              Save Profile
            </button>
          </form>
        </div>

        <FeedCard user={{ firstName, lastName, age, about, photos, gender }} />

        {showtost && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          </div>
        )}
      </div>
    )
  );
}
