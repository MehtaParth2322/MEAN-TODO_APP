const mongoose = require('mongoose');

const Todoschema = mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Discription:{
        type: String,
        required: true
    },
    StartDate:{
        type: String,
        default: Date.now,
        required: true
    },
    EndDate:{
        type: String,
        default: Date.now,
        required: true
    },
    Status:{
        type: String,
        required: true
    }
    
});

const Todo = module.exports = mongoose.model('Todo',Todoschema);