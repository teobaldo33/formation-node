const User = require('../models/UserModel')

exports.signinUser = (req, res) => {
    const user = new User(req.body);
    console.log(req.body);
    user.save((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "something went wrong",
            });
        }
        res.json({ user });
    });
};

exports.loginUser = (req, res) => {
    const{ username, password } = req.body;
    if(username && password){
        if(req.session.authenticated){
            res.json(req.session)
        } else {
            if(password === '123'){
                req.session.authenticated = true;
                req.session.user = {
                    username, password
                };
                User.updateOne({username: username},{sessionID: req.sessionID},(err, task) => {
                    res.json(task)
                });
            } else {
                res.status(403).json({msg : 'Mauvais mot de passe'})
            }
        }
    } else {
        res.status(403).json({msg : 'Mauvais mot de passe'})
    }
};

exports.logoutUser = (req, res) => {
    const{ username} = req.body;
    if(username){
        if(req.session.authenticated){
            req.session.authenticated = false;
            User.updateOne({username: username},{sessionID: null},(err, result) => {
                res.json(result)
            });
        } else {
            res.status(403).json({msg : 'Pas authentifié'})
        }
    } else {
        res.status(400).json({msg : 'Bad request'})
    }
};
