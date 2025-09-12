import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.get('/', (res, req)=> {
    res.sent('<h1>Hello World</h1>');
    res.sent({ message: 'Hello World' });
})

app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))