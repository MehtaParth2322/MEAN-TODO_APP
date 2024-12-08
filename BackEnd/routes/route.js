const express = require('express');
const { async } = require('rxjs');
const Todo = require('../Models/Todo');
const router = express.Router();

const todo = require('../Models/Todo');

// Retriving Data
router.get('/Todo', (req, res, next) => {
    // res.send("Retriving The Todo");
    Todo.find(function (err, Todo) {
        res.json(Todo)
    })
})

router.get('/Todo/:id', (req, res, next) => {
    // res.send("Retriving The Todo");
    Todo.findById(req.params.id , function (err, Todo) {
        res.json(Todo)
    })
})

// Add Data
router.post('/Todo', (req, res, next) => {
    let newTodo = new Todo({
        Title: req.body.Title,
        Discription: req.body.Discription,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        Status: req.body.Status
    });
    console.log(newTodo);
    newTodo.save((err, Todo) => {
        if (err) {
            
            res.json(err);
        }
        else {
            res.json({ msg: 'Todo added successfully' });
        }
    });
});

//Delete Data
router.delete('/Todo/:id', (req, res, next) => {
    Todo.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

// Edit

router.patch('/todo/:id', async(req, res) => {
    // console.log(req.params)
    // res.send("Hello");
    // let newTodo = new Todo();

   const result = await Todo.findByIdAndUpdate(req.params.id, {
    Title: req.body.Title,
    Discription: req.body.Discription,
    StartDate: req.body.StartDate,
    EndDate: req.body.EndDate,
    Status: req.body.Status
});
   if(result){
       res.send(result);
   }
})
module.exports = router;
