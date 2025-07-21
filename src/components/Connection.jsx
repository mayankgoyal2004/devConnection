import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connections";
import { base_url } from "../utils/baseUrl";

const Connection = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  const fetchData = async function () {
    const response = await axios.get(base_url+"/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnection(response.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!connection) return;
  if (connection.length === 0) return <div>No connection Found</div>;
  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
      Your Connections
    </h1>

    <div className="space-y-6 max-w-3xl mx-auto">
      {Array.isArray(connection) &&
        connection.map((conn, index) => {
          const { firstName, lastName, age, gender, about, photos } = conn;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md flex items-center p-5 gap-6 hover:shadow-xl transition"
            >
              <img
                src={photos}
                alt={`${firstName} ${lastName}`}
                className="w-24 h-24 rounded-full object-cover border border-indigo-300"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-600 text-sm mb-2">{about}</p>
                <div className="text-sm text-gray-500 flex gap-5">
                  <span>Age: {age}</span>
                  <span>Gender: {gender}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  </div>
);


};

export default Connection;
