import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { useEffect } from "react";
import { base_url } from "../utils/baseUrl";
import Footer from "./Footer"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchData = async function () {
    try {
      const response = await axios.get(base_url+"/profile", {
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
      <Footer />
    </>
  );
};

export default Body;
