const std_repo = require('./../../api/repository_db/student_repo');




exports.checkin = async(req,res)=>{
    let room_id = req.body.room_id;
    let u_id = req.body.u_id;
    try{
        let data = await std_repo.checkin(room_id,u_id);
        console.log(data);
        res.send({
            "success" : data? true : false
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
            "success" : data? true : false
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

exports.getInfo = async(req,res)=>{
    let u_id = req.body.u_id;
    let room_id = req.body.room_id;
    if(req.body.room_id){
        try {
            let data = await std_repo.getInfo(u_id,room_id);
            let obj = data[0]
            if(obj!=undefined&&obj.msg == 'has account and checkin'){
                res.send({
                    "success" : true,
                    "hasAccount" : true,
                    "hasCheckin" : true,
                    "student_id" : obj.student_id,
                    "student_name" : obj.student_name,
                    "room_name" : obj.room_name,
                    "capacity" : obj.capacity
                })
            }
            else if (obj!=undefined&&obj.msg == 'has account no checkin'){
                res.send({
                    "success" : true,
                    "hasAccount" : true,
                    "hasCheckin" : false,
                    "student_id" : obj.student_id,
                    "student_name" : obj.student_name,
                    "room_name" : obj.room_name,
                    "capacity" : obj.capacity
                })
            }
            else {
                res.send({
                    "success" : true,
                    "hasAccount" : false,
                })
            }
        }
        catch(ex){
            console.log(ex)
        }
    }else{
        res.send({
            "success":false
        })
    }
    
}