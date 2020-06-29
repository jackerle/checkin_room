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