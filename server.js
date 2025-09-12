import 'dotenv/config';
import express from 'express';


const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res)=> {
    res.send('<h1>Hello World</h1>');
    //res.send({ message: 'Hello World' });
})

app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))