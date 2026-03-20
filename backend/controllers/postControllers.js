import Post from "../model/Post.js";

// create post
export const createPost = async (req, res) => {
  debugger;
  try {
    const { title, content, category, tags } = req.body;
    if (!title || !content || !category || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      title,
      content,
      category,
      tags,
    });

    res.status(200).json({ message: "Create successfully", post: post });
  } catch (error) {
    console.log(error);
  }
};

// Update an existing blog post"
// will update through id
export const updatePost = async (req, res) => {
  try {
    const postID = req.params.id;

    if (!postID) {
      return res.status(400).json({ message: "ID required" });
    }

    const updatedPost = await Post.findByIdAndUpdate(postID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an existing blog post

export const deletePost = async (req, res) => {
  try {
    const blogID = req.params.id;
    console.log(blogID);
    if (!blogID) {
      return res.status(400).json({ message: "ID's required" });
    }
    const deletedPost = await Post.findByIdAndDelete(blogID);
    if (!deletedPost) {
      return res.status(404).json({ message: "Unsuccessful delete" });
    }
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post

export const singlePost = async (req, res) => {
  try {
    const blogID = req.params.id;
    if (!blogID) {
      return res.status(400).json({ message: "ID's required" });
    }
    const getSinglePost = await Post.findById(blogID);
    if (!getSinglePost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ message: "Post fetch successfully", post: getSinglePost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blog posts
export const getAllPost = async (req, res) => {
  try {
    const getAllPost = await Post.find();
    if (!getAllPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ message: "Post fetch successfully", post: getAllPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter blog posts by a search term

// export const searchItem = async (req, res) => {
//   try {
//     const data = req.body;
//     const title = data.title;
//     if (!title) {
//       return res.status(401).json({ message: "No title in this name found" });
//     }

//     const filterPost = await Post.find({ title });
//     console.log(filterPost.length);
//     if (!filterPost.length) {
//       return res.status(200).json({ message: 0 });
//     }
//     res
//       .status(200)
//       .json({ message: "Post fetch successfully", post: filterPost });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const searchItem = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(401).json({ message: "No title in this name found" });
    }

    const filterPost = await Post.find({
      title: { $regex: title, $options: "i" },
    });
    if (!filterPost.length) {
      return res.status(200).json({ message: 0, post: [] });
    }
    res
      .status(200)
      .json({ message: "Post fetch successfully", post: filterPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
