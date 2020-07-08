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
    let room_id = req.body.room_id;
    let u_id = req.body.u_id;
    try{
        let data = await std_repo.checkout(u_id,room_id);
        console.log('checkout success')
        console.log(data);
        res.send({
            "success" : data? true : false
        })
    }
    catch(ex){
        console.log(ex);
        res.send({
            "success":false,
        });
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
            console.log(obj)
            if(obj!=undefined&&obj.msg == 'has account and checkin'){
                res.send({
                    "success" : true,
                    "hasAccount" : true,
                    "hasCheckin" : true,
                    "tran": await this.getTran(u_id,room_id),
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


/**
 * 
 * @param {sting} u_id 
 * @typedef {Object} getTran
 * @property {number} room_id 
 * @property {string} timestamp_checkin 
 * @property {string} timestamp_checkout
 * @property {number} status
 * @returns {Promise<getTran>}
 */


exports.getTran = async(u_id,room_id)=>{
    try{
        let data = await std_repo. getTran(u_id,room_id);
        let tran = data[0];
        return tran;
    }
    catch (ex){
        console.log(ex)
    }
}

exports.getCheckin = async(req,res)=>{
    let room_id = req.query.room_id;
    try{
        let data = await std_repo.getCheckin(room_id);
        res.send(data)
    }
    catch(ex){
        console.log(ex)
    }
}



exports.getroom_in = async(req,res)=>{
    let room_id = req.query.room_id;
    try{
        let data = await std_repo.getroom_in(room_id);
        res.send(data)
    }
    catch(ex){
        console.log(ex)
    }
}

exports.getstudent_status = async(req,res)=>{
    let room = req.body.room;
    try{
        let data = await std_repo.get_student_status(room)
        res.send(data)
        console.log(data)
    }
    catch(ex){
        console.log(ex)
    }
}

exports.get_history = async(req,res)=>{
    let student_id = req.body.student_id;
    let student_name = req.body.student_name;
    let class_id = req.body.class_id;
    let class_sect = req.body.class_sect;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let room_id = req.body.room_id;
    std_repo.get_history(student_id,student_name,class_id,class_sect,start_time,end_time,room_id);
}