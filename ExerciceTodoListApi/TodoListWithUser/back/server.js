const express = require('express');
const app = express();
const todoRoutes = require("./routes/TodoRoutes");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require('mongoose');
const session = require('express-session');
const convertService = require('./services/ConvertService')
// const store = new session.MemoryStore();

app.use(express.json());

app.use(session({
    secret: 'some secret',
    cookie: { maxAge: 30000},
    saveUninitialized:false
}))

app.use((req,res,next) =>{
    // console.log(store);
    next();
})


mongoose.set('strictQuery', false);
// DB connection
mongoose
    .connect("mongodb://127.0.0.1:27017/Todo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("CONNECTED TO DATABASE");
    });

app.post("/convertEURTO", (req, res)=>{
    console.log(req.body)
    convertService.getChangeRate(req.body.devise).then((taux)=>{
        console.log(taux);
        let returnValue = req.body.value*taux;
        res.json({value: returnValue});
    })
})


app.use("/api/user", userRoutes);
app.use("/api", todoRoutes);



// start the server in the port 8000
app.listen(6000);


