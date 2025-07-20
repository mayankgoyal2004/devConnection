import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestslice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7777/user/request/received",
        {
          withCredentials: true,
        }
      );
      dispatch(addRequest(response.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err.message);
    }
  };

  const handleDecision = async (status, requestId) => {
    try {
      await axios.patch(
        "http://localhost:7777/request/send" + "/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      fetchData();
    } catch (err) {
      console.error("Decision failed:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

   if (!requests) return;
  //  if (requests.length === 0) return <div>No connection Found</div>;
  
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Received Requests
      </h1>

      <div className="space-y-6 max-w-3xl mx-auto">
        {requests.length > 0 ? (
          requests.map((req) => {
            const requestId = req._id;
            const {
              fromUserId: { firstName, lastName, about, photos },
            } = req;
 

            return (
              <div
                key={requestId}
                className="bg-white flex items-center justify-between p-5 shadow-md rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={photos}
                    alt={firstName}
                    className="w-16 h-16 rounded-full border"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{about}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleDecision("accepted", requestId)}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision("rejected", requestId)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Request;
