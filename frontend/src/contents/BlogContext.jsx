import { createContext, useContext, useState } from "react";
import { singlePostAPI } from "../api/api";
const BlogContext = createContext();
export const BlogProvider = ({ children }) => {
  const [blogItems, setBlogItems] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const singlePost = async (id) => {
    try {
      const res = await singlePostAPI(id);
      // console.log(res);
      setSelectedPost([res]);
    } catch (err) {
      console.log(err);
    }
  };

  // const searchBlog = async (title) => {
  //   try {
  //     const res = await searchItem(title);
  //     // console.log(res);
  //     setSearchData([res]);
  //     console.log(searchData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // console.log(searchData);

  return (
    <BlogContext.Provider
      value={{ blogItems, setBlogItems, singlePost, selectedPost, searchData }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
