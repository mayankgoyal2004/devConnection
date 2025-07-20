import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/body";
import Login from "./components/Login";
import Feed from "./components/feed";
import Profile from "./components/Profile";
import SignIn from "./components/Signup";
import Connection from "./components/Connection";
import Request from "./components/Request";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connection />}/>
          <Route path="/request" element={<Request />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
