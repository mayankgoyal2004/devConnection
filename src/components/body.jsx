import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Fotter from "./Fotter";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchData = async function () {
    try {
      const response = await axios.get("http://localhost:7777/profile", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      if(error.response?.status ==401){
        navigate("/login")
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Fotter />
    </>
  );
};

export default Body;
