import express from 'express';
import path from 'path';
import url from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';


const PORT = process.env.PORT || 3000;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setup a static folder the only diff you will write http://localhost:8000/about.html instead of about
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(express.json()); //POST in body row 
app.use(express.urlencoded({ extended: false })); //POST www-form-urlencoded

// app.get('/', (req, res)=> {
    //     //res.send('<h1>Hello World</h1>');
    //     //res.send({ message: 'Hello World' });

    //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


// app.get('/about', (req, res)=> {
//     //res.send('<h2>About</h2>');

//     res.sendFile(path.join(__dirname, 'public', 'about.html'))
// })
// logger middleware
app.use(logger);


// Routes
app.use('/api/posts', posts);

// Not Found route 
app.use((req, res, next)=> {
    const error = new Error('Route Not Found');
    error.status =  404;
    next(error);
})
// Error Handler
app.use(errorHandler);

app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))