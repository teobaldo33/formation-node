const express = require("express");
const router = express.Router();
const User = require('../models/UserModel')

const {
    getTaskById,
    getTask,
    getAllTasks,
    getTaskByIdNoParam,
    updatetaskNoParams,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/TodoController");

router.use((req,res,next) =>{
    console.log(req.session)
    if(req.session.user){
        User.findOne({username: req.session.user.username})
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Oops erreur dans le recherche de l'utilisateur",
                });
            }
            console.log(req.sessionID, user)
            if(user.sessionID === req.sessionID){
                console.log('OK')
                next()
            } else {
                return res.status(403).json({
                    error: "sessionID expirée",
                });
            }
        });
    } else {
        return res.status(403).json({
            error: "sessionID expirée",
        });
    }
    
})

router.get("/tasksno/:id/", getTaskByIdNoParam);

router.post("/tasksno/:id/",  updatetaskNoParams);

///

router.param("id", getTaskById);

router.get("/tasks/", getAllTasks);

router.get("/task/:id/", getTask);

router.post("/task/", createTask);

router.put("/task/:id", updateTask);

router.delete("/task/:id", deleteTask);




///

module.exports = router;