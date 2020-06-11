const express = require('express');
const app = express();
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser');
const env = require('./../env.json');
const cors = require('cors');
const std_controller = require('./controller/student_controller');
const checkin_controller = require('./controller/checkin_controller');


app.use(cors({origin: '*'}));
app.use(bodyParser.json());



app.get('/getstd',std_controller.getstd);
app.post('/regis_std',std_controller.regis_std);
app.post('/removestd',std_controller.removestd);
app.post('/regis_room',std_controller.regis_room);
app.get('/getroom',std_controller.getroom);
app.post('/checkin',checkin_controller.checkin);
app.post('/checkout',checkin_controller.checkout);
app.post('/hasAccount',checkin_controller.isRegis);
app.get('/getAllTrans',checkin_controller.getAllTrans);
app.post('/getObj',checkin_controller.getObj);



https.createServer({
    key : fs.readFileSync(env.SSL_KEY),
    cert : fs.readFileSync(env.SSL_FULLCHAIN)
},app)
.listen(env.PORT,()=>{
    console.log('opened on '+env.PORT)
})
