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