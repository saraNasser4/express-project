import express from 'express';

const router = express.Router()

let posts = [
    { 'id': 1, 'title': 'Post 1' },
    { 'id': 2, 'title': 'Post 2' },
    { 'id': 3, 'title': 'Post 3' },
];

// http://localhost:8000/api/posts?limit=1
router.get('/', (req, res)=> {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
});

// get a single post
router.get('/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    
    if (!post) {
        return res.status(404).json({ massage: 'Post Not Found' });
    }
    res.status(200).json(post);
});


export default router;