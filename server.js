const express = require('express');
const port = 3000;
const app = express();
const mongoose = require('mongoose');
//data
// const fruits = require('./models/fruits');
const Fruit = require('./models/fruits');
const vegetables = require('./models/vegetables');
//include the method-override package place this where you instructor places it
const methodOverride = require('method-override');



require('dotenv').config()

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, 
                { useNewUrlParser: true, 
                 useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


// middleware here
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
})
app.use(express.urlencoded({ extended: false }));

//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));


// view: JSX View Engine
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());



//### Delete/Destroy : Get rid of this particular thing!  
//### DELETE /fruits/:id
//### Update : Update this specific thing with this updated form 
//### PUT /fruits/:id
//### Create : Make a new thing with this filled out form 



// Routes here

// Fruits: 

// app.get('/fruits', function(req, res){
//     // res.render('Fruits/Index', { fruits: fruits });
//     res.render('Fruits/Index')
// });

app.get('/fruits', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('fruits/Index', {
            fruits: allFruits
        });
    });
});





// DELETE
app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/fruits');//redirect back to fruits index
    });
});

// EDIT
app.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        if(!err){
            res.render(
                'Fruits/Edit',
                {
                    fruit: foundFruit //pass in the found fruit so we can prefill the form
                }
            );
        } else {
            res.send({ msg: err.message})
        }
    })
})

// PUT
app.put('/fruits/:id', (req,res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.reqdyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit)=>{
        console.log(updatedFruit)
        res.redirect(`/fruits/${req.params.id}`);
    });
});


// SEED
app.get('/fruits/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ], (err, data)=>{
        res.redirect('/fruits');
    })
});



// GET


// Create a new route and page
app.get('/fruits/new', (req, res) => { // New is a form
    res.render('Fruits/New')
})

//POST --> create a fruit
// app.post('/fruits', (req, res)=>{
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true; //do some data correction
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false; //do some data correction
//     }
//     fruits.push(req.body);
//     console.log(fruits);
//     //res.send('data received');
//     res.redirect('/fruits'); //send the user back to /fruits
// });

app.post('/fruits/', (req, res) => {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    // Fruit.create(req.body, (error, createdFruit)=>{
    //     res.send(createdFruit);
    // });
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
    });
});

//
// app.get('/fruits/:indexOfFruitsArray', function (req, res) {
//     res.render('Fruits/Show', { //second param must be an object
//         fruit: fruits[req.params.indexOfFruitsArray] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
//     });
// });
app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('fruits/Show', {
            fruit: foundFruit
        });
    });
});




// Veggies:
app.get('/veggies/new', (req, res) => { // New is a form
    res.render('Vegetables/New')
})

//POST --> create a vegitable
// app.post('/veggies', (req,res)=>{
//     if(req.body.readyToEat=== 'on'){
//         req.body.readyToEat = true;
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false; //do some data correction
//     }
//     fruits.push(req.body);
//     console.log(fruits);
//     res.redirect('/veggies'); //send the user back to /fruits
// })

app.post('/veggies/', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    vegetables.create(req.body, (error, createdVeggie) => {
        res.redirect('/veggies')
    })
})

//Route:
app.get('/veggies', function (req, res) {
    // res.render('Vegetables/Index', { vegetables: vegetables });
    vegetables.find({}, (error, allVeggies) => {
        res.render('Vegetables/Index', {
            vegetables: allVeggies
        });
    });
});

app.get('/veggies/:id', function (req, res) {
    // res.render('Vegetables/Show', {
    //     vegetable: vegetables[req.params.id] 
    // });
    vegetables.findById(req.params.id, (err, foundVeggie) => {
        console.log(foundVeggie);
        res.render('Vegetables/Show', {
            veggie: foundVeggie
        });
    });
});

// Tell express listen
app.listen(port, () => {
    console.log(`Server is listening on, ${port}`)
})


