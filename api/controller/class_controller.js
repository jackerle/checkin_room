const std_repo = require('./../../api/repository_db/student_repo');

exports.getAllClass = async (req,res)=>{
    try{
        let data  = await std_repo.getAllClass();
        res.send(data)
    }
    catch(ex){
        console.log(ex)
    }
   
}

exports.getSchedule = async (req,res)=>{
    let class_id = req.body.class_id;
    let class_sect = req.body.class_sect;
    try {
        let data = await std_repo.getSchedule(class_id,class_sect);
        res.send(data)
    }
    catch(ex){
        console.log(ex)
    }
}


exports.getReg = async (req,res)=>{
    let class_id = req.body.class_id;
    let class_sect = req.body.class_sect;
    try{
        let data = await std_repo.getReg(class_id,class_sect);
        res.send(data)
    }
    catch(ex){
        console.log(ex)
    }
}
    
exports.getClass_room = async (req,res)=>{
    let room_id = req.body.room_id;
    let day = req.body.day;
    try{
        let data = await std_repo.getClass_room(room_id,day);
        res.send(data)
    }
    catch(ex){
        console.log(ex)
    }
}


exports.add_class = async (req,res)=>{
    let class_id = req.body.class_id;
    let class_sect = req.body.class_sect;
    let class_name = req.body.class_name;
    let schedule = req.body.schedule;
    try{
        let data = await std_repo.add_class(class_id,class_sect,class_name,schedule)
        console.log(data);
        res.send(data)
    }
    catch(ex){
        console.log(ex)
    }
}

