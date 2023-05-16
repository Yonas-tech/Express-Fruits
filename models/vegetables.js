// const vegetables = [
//     {
//         name:'Beets',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name:'Artichokes',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'Pumpkin',
//         color: 'orange',
//         readyToEat: true
//     },

// const { default: mongoose } = require("mongoose");

//     {
//         name:'Cauliflower',
//         color: 'white',
//         readyToEat: false
//     },

//     {
//         name:'Zucchini',
//         color: 'green',
//         readyToEat: true
//     }
// ];

// module.exports = vegetables;

const mongoose = require('mongoose');
const veggieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToEat: Boolean,
});

const Veggie = mongoose.model('Veggie', veggieSchema);

module.exports = Veggie; 

