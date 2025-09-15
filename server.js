import express from 'express';
import path from 'path';
import url from 'url';
import posts from './routes/posts.js'


const PORT = process.env.PORT || 3000;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setup a static folder the only diff you will write http://localhost:8000/about.html instead of about
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res)=> {
    //     //res.send('<h1>Hello World</h1>');
    //     //res.send({ message: 'Hello World' });

    //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


// app.get('/about', (req, res)=> {
//     //res.send('<h2>About</h2>');

//     res.sendFile(path.join(__dirname, 'public', 'about.html'))
// })

// Routes
app.use('/api/posts', posts);

app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))