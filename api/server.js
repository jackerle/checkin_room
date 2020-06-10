const express = require('express');
const std_repo = require('./repository_db/student_repo.js')
const app = express();
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser');
const env = require('./../env.json');
const cors = require('cors')



app.use(cors({origin: '*'}));
app.use(bodyParser.json());



app.get('/getstd',async (req,res)=>{
    try{
        let data = await std_repo.getAllStd();
        res.send(data);
    }
    catch(ex){
        console.log(ex)
    }
})


app.post('/regis_std',async (req,res)=>{
    const user_id = req.body.user_id;
    const student_id = req.body.student_id;
    const student_name = req.body.student_name;
    try {
        let data = await std_repo.register_std(user_id,student_id,student_name);
        console.log(data)
        res.sendStatus(200)
    }
    catch(ex){
        console.log(ex)
        res.sendStatus(404)
    }
})

app.post('/regis_room',async (req,res)=>{
    const room_name = req.body.room_name;
    const capacity = req.body.capacity;
    try {
        let data = await std_repo.register_room(room_name,capacity);
        console.log(data)
        res.sendStatus(200)
    }
    catch(ex){
        console.log(ex)
        res.sendStatus(404)
    }
})

app.get('/getroom',async (req,res)=>{
    try{
        let data = await std_repo.getAllRoom();
        res.send(data);
    }
    catch(ex){
        console.log(ex)
    }
})


https.createServer({
    key : fs.readFileSync(env.SSL_KEY),
    cert : fs.readFileSync(env.SSL_FULLCHAIN)
},app)
.listen(env.PORT,()=>{
    console.log('opened on '+env.PORT)
})
