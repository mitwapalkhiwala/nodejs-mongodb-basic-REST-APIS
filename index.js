const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successful connection");
}).catch(err=>{
    console.log('Error connection to DB:',err);
    process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.json({"message":"Welcome"})
});
require('./app/routes/note.routes.js')(app);

app.listen(8080,()=>{
    console.log("Server on port 8080");
});