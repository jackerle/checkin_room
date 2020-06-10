const std_repo = require('./../../api/repository_db/student_repo');

exports.checkin = async(req,res)=>{
    let room_id = req.body.room_id;
    let u_id = req.body.u_id;
    try{
        let data = await std_repo.checkin(room_id,u_id);
        console.log(data);
        res.sendStatus(200);
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
        res.sendStatus(200)
    }
    catch(ex){
        console.log(ex);
        res.sendStatus(404);
    }
}

exports.isRegis = async(req,res)=>{
    let u_id = req.body.u_id;
    try{
        let data = await std_repo.isRegis(u_id);
        console.log(data[0]);
        
        res.send({
            "hasAccount" : data[0]? true : false
        })
    }
    catch(ex){
        console.log(ex);
        res.sendStatus(404);
    }
}
