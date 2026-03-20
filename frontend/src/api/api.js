import axios from "axios";
const url = import.meta.env.VITE_APP_URL;
export const getAllPost = async () => {
  try {
    const res = await axios.post(`${url}/get-all-post`);
    const data = res.data.post;
    return data;
  } catch (error) {
    console.log(error);
  }
};

//post-blogging
export const postBlogging = async (formValue, tag) => {
  try {
    const data = await axios.post(`${url}/post-blogging`, {
      title: formValue.title,
      content: formValue.content,
      category: formValue.category,
      tags: tag,
    });
    if (data.status == 200) {
      alert("Uploaded successfull");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

// delete post
export const deletePost = async (id) => {
  try {
    const data = await axios.delete(`${url}/delete-post/${id}`);
    if (data.status == 200) {
      alert("Deleted succesful");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

// update post
export const updatePost = async (id, formValue, tag) => {
  // debugger;
  try {
    const data = await axios.patch(`${url}/update-post/${id}`, {
      title: formValue.title,
      content: formValue.content,
      category: formValue.category,
      tags: tag,
    });
    if (data.status == 200) {
      alert("Update post succesful");
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
// single-post
export const singlePostAPI = async (id) => {
  try {
    const res = await axios.post(`${url}/single-post/${id}`);
    if (res.status == 200) {
      return res.data.post;
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchItem = async (searchData) => {
  try {
    const res = await axios.post(`${url}/search-item`, {
      title: searchData,
    });
    if (res.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
