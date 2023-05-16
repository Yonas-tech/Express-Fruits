const express = require('express');
const port = 3000;
const app = express();

// middleware here

//data
// const fruits = ['apple', 'banana', 'pear'];
const fruits = require('./models/fruits');

// Routes here
app.get('/fruits/', (req, res) => {
    res.send(fruits);
});

app.get('/fruits/:index', (req,res)=>{
    res.send(fruits[req.params.index])
})

// Tell express listen
app.listen(port, ()=>{
    console.log(`Server is listening on, ${port}`)
})

