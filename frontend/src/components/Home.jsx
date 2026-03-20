import React, { useEffect, useState } from "react";
import {
  deletePost,
  getAllPost,
  postBlogging,
  searchItem,
  updatePost,
} from "../api/api";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../contents/BlogContext";

const Home = () => {
  const { singlePost } = useBlog();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [allPostData, setAllPostData] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [getValue, setGetValue] = useState(null);
  const [showAllPost, setShowAllPost] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchData, setShowSearchData] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [showValue, setShowValue] = useState();
  const [isDisplay, setIsDisplay] = useState(true);
  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    try {
      const data = await getAllPost();
      if (data.length > 0) {
        setAllPostData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleSearch = async () => {
    const res = await searchItem(search);
    if (res) {
      debugger;
      const allData = res.data.post;
      setShowMessage(res.data.message);
      setShowValue(allData);
      console.log(allData);
      setIsDisplay(false);
    }
  };
  const handleSubmit = async (formValue, tag) => {
    // we need to check for the input validation
    if (
      formValue.title === "" ||
      formValue.content === "" ||
      formValue.category === "" ||
      tag.length === 0
    ) {
      alert("Please filled up all the field");
      return;
    }
    postBlogging(formValue, tag);
    setFormValue({
      title: "",
      content: "",
      category: "",
    });
    setInputTag("");
    setOpen(false);
  };

  const updatedData = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div
          className="bg-white shadow-lg rounded-xl w-96 p-6 space-y-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col gap-2 ">
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              value={formValue.title}
              onChange={(e) =>
                setFormValue({ ...formValue, title: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Enter content"
              value={formValue.content}
              name="content"
              onChange={(e) =>
                setFormValue({ ...formValue, content: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Enter category"
              value={formValue.category}
              name="category"
              onChange={(e) =>
                setFormValue({ ...formValue, category: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Tag"
              value={inputTag}
              onChange={(e) => {
                setInputTag(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputTag != "") {
                  e.preventDefault();
                  setTag([...getValue.tags, inputTag.trim()]);
                  setInputTag("");
                }
              }}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* tag  */}
            {tag.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tag?.map((val, index) => (
                  <div className="border rounded-full shadow-sm border-blue-500 bg-blue-200 px-2 py-1 gap-2  items-center flex">
                    <span className="text-sm">{val}</span>
                    <button
                      onClick={() => {
                        const newTags = tag?.filter((_, i) => i !== index);
                        setInputTag("");
                        setTag(newTags);
                      }}
                      className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={async () => {
                const res = await updatePost(getValue._id, formValue, tag);

                if (res) {
                  setIsUpdate(false);
                  fetchPost();
                }
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-r from-blue-200 to-purple-200"
      onClick={() => setIsUpdate(false)}
    >
      {/* sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 rounded">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="space-y-3">
          <li
            className="cursor-pointer text-blue-600 font-semibold"
            onClick={() => setShowAllPost((e) => !e)}
          >
            All Post
          </li>
        </ul>
      </div>
      {/* main content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // searchData()
              }}
              onKeyDown={(e) => {
                if (e.key == "Backspace" && search === "") {
                  setIsDisplay(true);
                }
              }}
              className="px-3 py-1 border rounded-lg"
            />

            <button
              className="bg-red-500 rounded-full text-white px-4 py-2 cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="bg-blue-500 rounded-full text-white px-4 py-2 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              + New Post
            </button>
          </div>
        </div>
        {showAllPost ? (
          allPostData?.length > 0 && (
            <div className="p-6 cursor-pointer">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {allPostData.map((e, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate("/single");
                      singlePost(e._id);
                    }}
                    className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
                  >
                    {/* DELETE ICON */}
                    <MdDelete
                      onClick={async () => {
                        await deletePost(e._id);
                        fetchPost();
                      }}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer text-xl"
                    />
                    {/* https://roadmap.sh/projects/personal-blog */}
                    <FaEdit
                      onClick={(c) => {
                        c.stopPropagation();
                        setIsUpdate(true);
                        setGetValue(e);
                        setFormValue({
                          title: e.title,
                          content: e.content,
                          category: e.category,
                        });
                        setTag(e.tags);
                      }}
                      className="absolute top-3 right-10 text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                    />
                    <h2 className="text-lg font-bold text-blue-600 mb-2">
                      {e.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {e.content}
                    </p>

                    <span className="inline-block bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full w-fit mb-3">
                      {e.category}
                    </span>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {e?.tags?.map((t, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : isDisplay ? (
          <div className="flex justify-center items-center">
            <h1 className="text-xl">Welcome to blog Post</h1>
          </div>
        ) : showMessage == 0 ? (
          <div className="flex justify-center items-center">
            <h3>No Data found</h3>
          </div>
        ) : showValue.length > 0 ? (
          <div className="p-6 cursor-pointer">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {showValue.map((e, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate("/single");
                    singlePost(e._id);
                  }}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
                >
                  {/* DELETE ICON */}
                  <MdDelete
                    onClick={async () => {
                      await deletePost(e._id);
                      fetchPost();
                    }}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer text-xl"
                  />
                  <FaEdit
                    onClick={(c) => {
                      c.stopPropagation();
                      setIsUpdate(true);
                      setGetValue(e);
                      setFormValue({
                        title: e.title,
                        content: e.content,
                        category: e.category,
                      });
                      setTag(e.tags);
                    }}
                    className="absolute top-3 right-10 text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                  />
                  <h2 className="text-lg font-bold text-blue-600 mb-2">
                    {e.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {e.content}
                  </p>

                  <span className="inline-block bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full w-fit mb-3">
                    {e.category}
                  </span>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {e?.tags?.map((t, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* if the pop container is close */}
        {open && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/30"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white shadow-lg rounded-xl w-96 p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2 ">
                <input
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={formValue.title}
                  onChange={(e) =>
                    setFormValue({ ...formValue, title: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Enter content"
                  value={formValue.content}
                  name="content"
                  onChange={(e) =>
                    setFormValue({ ...formValue, content: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Enter category"
                  value={formValue.category}
                  name="category"
                  onChange={(e) =>
                    setFormValue({ ...formValue, category: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Tag"
                  value={inputTag}
                  onChange={(e) => {
                    setInputTag(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputTag != "") {
                      e.preventDefault();
                      setTag([...tag, inputTag.trim()]);
                      setInputTag("");
                    }
                  }}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* tag  */}
                {tag.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tag?.map((e, index) => (
                      <div className="border rounded-full shadow-sm border-blue-500 bg-blue-200 px-2 py-1 gap-2  items-center flex">
                        <span className="text-sm">{e}</span>
                        <button
                          onClick={() => {
                            const newTags = tag?.filter((_, i) => i !== index);
                            setTag(newTags);
                          }}
                          className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleSubmit(formValue, tag)}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {isUpdate && getValue && updatedData()}
      </div>
    </div>
  );
};
export default Home;
