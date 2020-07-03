const express = require('express');
const app = express();
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser');
const env = require('./../env.json');
const cors = require('cors');
const authenRoute = express.Router();
const std_controller = require('./controller/student_controller');
const checkin_controller = require('./controller/checkin_controller');
const login_controller = require('./controller/login_controller');
const class_controller = require('./controller/class_controller')
const line_middle_ware = require('./line_authen');



app.use(cors({origin: ['https://127.0.0.1:3000','https://jackerle.bike','http://127.0.0.1','http://127.0.0.1:3000','http://localhost','https://crossknight.com'],credentials:true}));
app.use(bodyParser.json());
app.use('/api',authenRoute)



authenRoute.use(line_middle_ware.middle_ware);



app.post('/login',login_controller.login);
app.post('/register',login_controller.register);
app.post('/regis_room',std_controller.regis_room);
app.get('/getroom',std_controller.getroom);
app.get('/getAllTrans',checkin_controller.getAllTrans);
app.get('/getstd',std_controller.getstd);
app.get('/getCheckin',checkin_controller.getCheckin);
app.get('/getAllClass',class_controller.getAllClass);
app.post('/getSchedule',class_controller.getSchedule);
app.post('/getReg',class_controller.getReg);
app.post('/getClass_room',class_controller.getClass_room);
authenRoute.post('/checkin',checkin_controller.checkin);
authenRoute.post('/checkout',checkin_controller.checkout);
authenRoute.post('/regis_std',std_controller.regis_std);
authenRoute.post('/removestd',std_controller.removestd);
authenRoute.post('/getInfo',checkin_controller.getInfo);
authenRoute.post('/hasAccount',std_controller.hasAccount);


https.createServer({
    key : fs.readFileSync(env.SSL_KEY),
    cert : fs.readFileSync(env.SSL_FULLCHAIN)
},app)
.listen(env.PORT,()=>{
    console.log('opened on '+env.PORT)
})
