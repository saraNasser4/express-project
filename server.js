import express from 'express';
import path from 'path';
import url from 'url'


const PORT = process.env.PORT || 3000;

const app = express();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let posts = [
    { 'id': 1, 'title': 'Post 1' },
    { 'id': 2, 'title': 'Post 2' },
    { 'id': 3, 'title': 'Post 3' },
];

// setup a static folder the only diff you will write http://localhost:8000/about.html instead of about
app.use(express.static(path.join(__dirname, 'public')));

// http://localhost:8000/api/posts?limit=1
app.get('/api/posts', (req, res)=> {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        res.json(posts.slice(0, limit));
    } else {
        res.json(posts);
    }
})

// get a single post
app.get('/api/posts/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const post = posts.filter((post)=> post.id === id)
    res.json(post);
})
// app.get('/', (req, res)=> {
//     //res.send('<h1>Hello World</h1>');
//     //res.send({ message: 'Hello World' });

//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


// app.get('/about', (req, res)=> {
//     //res.send('<h2>About</h2>');

//     res.sendFile(path.join(__dirname, 'public', 'about.html'))
// })

app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))