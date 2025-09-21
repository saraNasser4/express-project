import express from 'express';
import { getAllPosts, getPost, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router()



// http://localhost:8000/api/posts?limit=1
router.get('/', getAllPosts);

// get a single post
router.get('/:id', getPost);

// Create a new post
router.post('/', createPost);

// PUT a post
router.put('/:id', updatePost);

// DELETE a post
router.delete('/:id', deletePost)

export default router;