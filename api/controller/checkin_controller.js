const std_repo = require('./../../api/repository_db/student_repo');




exports.checkin = async(req,res)=>{
    let room_id = req.body.room_id;
    let u_id = req.body.u_id;
    try{
        let data = await std_repo.checkin(room_id,u_id);
        console.log(data);
        res.send({
            "status" : data? true : false
        });
    }
    catch(ex){
        console.log(ex);
        res.sendStatus(404);
    }
}

exports.checkout = async(req,res)=>{
    let u_id = req.body.u_id;
    try{
        let data = await std_repo.checkout(u_id);
        console.log(data);
        res.send({
            "status" : data? true : false
        })
    }
    catch(ex){
        console.log(ex);
        res.sendStatus(404);
    }
}

exports.hasAccount = async(req,res)=>{
    let u_id = req.body.u_id;
    try{
        let data = await std_repo.hasAccount(u_id);
        console.log(data[0]);
        
        res.send({
            "success" : data[0]? true : false
        })
    }
    catch(ex){
        console.log(ex);
        res.sendStatus(404);
    }
}

exports.getAllTrans = async(req,res)=>{
    try {
        let data = await std_repo.getAllTrans();
        res.send(data);
    }
    catch (ex){
        console.log(ex);
    }
}

exports.getObj = async(req,res)=>{
    let room_id = req.body.room_id;
    let u_id = req.body.u_id;
    try {
        let data = await std_repo.getObj(room_id,u_id);
        res.send({
            "success" : true,
            "student_id" : data[0].student_id,
            "student_name" : data[0].student_name,
            "room_name" : data[0].room_name,
            "capacity" : data[0].capacity
        })
    }
    catch(ex){
        console.log(ex)
    }
}