import React, { useEffect, useState } from "react";
import { singlePostAPI } from "../api/api";
import { useBlog } from "../contents/BlogContext";

const SingleBlog = () => {
  const { selectedPost } = useBlog();
  useEffect(() => {
    //
  }, []);
  //

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/30">
      <div className="bg-white px-2 py-2 rounded w-100 h-100 justify-center items-center flex">
        {selectedPost?.map((e) => (
          <div key={e._id}>
            <h1>Title : {e.title}</h1>
            <h3>Category : {e.category}</h3>
            <h3>Content : {e.content}</h3>
            <div className="flex flex-wrap gap-2 mt-5">
              {e.tags.map((e, i) => (
                <span
                  className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                  key={i}
                >
                  #{e}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBlog;
