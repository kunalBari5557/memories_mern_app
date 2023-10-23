import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
      <BrowserRouter>
        <Container maxWidth="xl">
          <Toaster/>
          <Navbar />
          <Routes>
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate replace to="/posts" />}
            />
            <Route path="/" element={<Navigate replace to="/posts" />} />
          </Routes>
        </Container>
      </BrowserRouter>
  );
};

export default App;
