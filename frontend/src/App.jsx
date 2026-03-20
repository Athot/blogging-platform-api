import React from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { BlogProvider } from "./contents/BlogContext";
import SingleBlog from "./components/SingleBlog";

const App = () => {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<SingleBlog />} />
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
};

export default App;
