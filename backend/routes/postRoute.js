import express from "express"
import { createPost, deletePost, getAllPost, updatePost } from "../controller/Post.controller.js";

const postRouter = express.Router();

postRouter.post("/createpost",createPost)
postRouter.get("/getAllPost",getAllPost);
postRouter.put("/updatePost",updatePost)
postRouter.delete("/deletePost",deletePost);

export default postRouter