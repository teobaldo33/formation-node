const Task = require('../models/TaskModel')

exports.getTaskById = (req, res, next, id) => {
    Task.findById(id).exec((err, task) => {
        if (err || !task) {
            console.log(err.reason.toString())
            return res.status(404).json({
                error: err.reason.toString(),
            });
        }
        req.task = task;
        next();
    });
};

exports.getTask = (req, res) => {
    return res.json(req.task);
};

exports.getAllTasks = (req, res) => {
    Task.find()
        .exec((err, tasks) => {
            if (err || !tasks) {
                return res.status(400).json({
                    error: "Something went wrong in finding all tasks",
                });
            }
            res.json(tasks);
        });
};



exports.createTask = (req, res) => {
    const task = new Task(req.body);
    task.save((err, task) => {
        if (err || !task) {
            return res.status(400).json({
                error: "something went wrong",
            });
        }
        res.json({ task });
    });
};


exports.deleteTask = (req, res) => {
    const task = req.task;
    task.remove((err, task) => {
        if (err || !task) {
            return res.status(400).json({
                error: "something went wrong while deleting the task",
            });
        }
        res.json({
            task_deleted: task,
            message: "task deleted successfully!",
        });
    });
};


exports.updateTask = (req, res) => {
    let task = req.task;

    task.titre = req.body.titre;
    task.corps = req.body.corps;
    task.importance = req.body.importance;
    task.date = new Date(req.body.date);
    task.statut = req.body.statut;

    console.log(task);

    task.save((err, task) => {
        if (err || !task) {
            console.log(err)
            return res.status(400).json({
                error: "something went wrong",
            });
        }
        res.json({ task });
    });
};


exports.getTaskByIdNoParam = (req, res) => {
    console.log(req);
    const id = req.params.id;
    Task.findById(id).exec((err, task) => {
        res.json(task)
    });
};


exports.updatetaskNoParams = (req, res) => {
    console.log(req.body);
    Task.updateOne(req.body,(err, task) => {
        res.json(task)
    });
};