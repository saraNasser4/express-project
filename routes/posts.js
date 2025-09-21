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
router.get('/:id', (req, res, next)=> {
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    
    if (!post) {
        const error = new Error(`Post Number ${id} Not Found`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
});

// Create a new post
router.post('/', (req, res, next)=> {
    const newPost = {
        id: posts.length + 1,
        title: req.body?.title || req.query.title,
    }

    if (!newPost.title) {
        const err = new Error('Please include a title');
        err.status = 400;
        return next(err);
    };

    posts.push(newPost);

    res.status(201).json(posts)
});

// PUT a post
router.put('/:id', (req, res, next)=> {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if(!post) {
        const err = new Error('Post not Found to be Updated');
        err.status = 404;
        return next(err);
    } 

    post.title = req.body?.title || req.query.title;

    res.status(200).json(posts);
});

// DELETE a post
router.delete('/:id', (req, res, next)=> {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if(!post) {
        const err = new Error('Post not Found');
        err.status = 404;
        return next(err);
    } 
    posts = posts.filter(post => post.id != id);
    res.status(200).json(posts)
})

export default router;