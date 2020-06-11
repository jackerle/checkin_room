const std_repo = require('./../../api/repository_db/student_repo')

exports.getstd = async (req,res)=>{
    try{
        let data = await std_repo.getAllStd();
        res.send(data);
    }
    catch(ex){
        console.log(ex)
    }
}

exports.regis_std = async (req,res)=>{
    let user_id = req.body.user_id;
    let student_id = req.body.student_id;
    let student_name = req.body.student_name;
    console.log(user_id)
    try {
        let data = await std_repo.register_std(user_id,student_id,student_name);
        console.log(data)
        res.send({
            "success" : true,
        })
    }
    catch(ex){ 
        console.log(ex)
        res.send({
            "success": false
        })
    }
}

exports.removestd = async (req,res)=>{
    let student_id = req.body.student_id;
    try {
        let data = await std_repo.removeStd(student_id);
        console.log(data)
        res.sendStatus(200)
    }
    catch(ex){
        console.log(ex)
        res.sendStatus(404)
    }
}

exports.regis_room = async (req,res)=>{
    let room_name = req.body.room_name;
    let capacity = req.body.capacity;
    try {
        let data = await std_repo.register_room(room_name,capacity);
        console.log(data)
        res.sendStatus(200)
    }
    catch(ex){
        console.log(ex)
        res.sendStatus(404)
    }
}

exports.getroom = async (req,res)=>{
    try{
        let data = await std_repo.getAllRoom();
        console.log(data)
        res.send(data);
    }
    catch(ex){
        console.log(ex)
    }
}