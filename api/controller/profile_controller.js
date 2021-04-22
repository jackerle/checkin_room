const std_repo = require('./../../api/repository_db/student_repo')




exports.get_timeline = async (req,res) => {

    let student_id = req.body.student_id
    let u_id = req.body.u_id

    try {
        let data = await std_repo.get_timeline(student_id,u_id);
        res.send(data)
    }
    catch (ex) {
        console.log(ex);
        res.send(ex)
    }
}

