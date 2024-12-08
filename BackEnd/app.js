// Import Modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// Connect To Mongodb
mongoose.connect('mongodb://localhost:27017/MEAN-TODO', {useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify: false});

// On Connection
mongoose.connection.on('connected', ()=>{
  
    console.log("Connected To Database Mongodb @ 27017")
});

mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('Error in database Connection'+err)
    }
});

//port no
const port = 3000;

//adding Middleware - cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static File
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/api', route);

// Testing Server
app.get('/',(req,res) =>{
    res.send('foobar');
});

app.listen(port,()=>{
   console.log("Server Started at Port:"+port);
});
