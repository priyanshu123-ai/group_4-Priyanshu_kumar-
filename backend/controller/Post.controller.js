import jwt from "jsonwebtoken";
import { Post } from "../model/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, comment } = req.body;
    if (!title || !comment) {
      return res.status(401).json({
        success: false,
        message: "All field required",
      });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User unauthrozied",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    const post = await Post.create({
      title,
      comment,
      posted: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Post create Successfully",
      post,
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allpost = await Post.find().populate("posted", "fullName email");

    return res.status(201).json({
      success: "true",
      message: "All post fetched Successfully",
      post: allpost,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, comment } = req.body;
    const { id } = req.params;

    if (!title || !comment) {
      return res.status(401).json({
        success: false,
        message: "All fields required",
      });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(401).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.posted != userId) {
      return res.status(401).json({
        success: false,
        message: "You can update only your post",
      });
    }

    post.title = title;
    post.comment = comment;

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
