const express = require('express')
const  app = express();
const mongoose = require('mongoose')
const route = require("./routes/router.js")

app.use(express.json());
app.use(express.urlencoded({ extended:true }));


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
.then( ()=> console.log("MongoDb connected"))
.catch(err => console.log(err))


app.use('/',route)

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Express app running on Port: ' + (process.env.PORT||3000));
})