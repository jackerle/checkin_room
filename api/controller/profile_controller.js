const std_repo = require('./../../api/repository_db/student_repo')


exports.has_profile = async (req,res) => {

    let student_id = req.body.u_id

    try {
        let data = await std_repo.has_profile(student_id)
        res.send({
            "success" : data[0]? true : false
        }) 
    } catch (ex) {
        console.log(ex);
    }
}

exports.register_profile = async (req,res) => {

    let student_id = req.body.student_id
    let student_name = req.body.student_name
    let password = req.body.password

    try {
        let data = await std_repo.register_profile(student_id,student_name,password)
        res.send({
            "success":true
        })
    } catch (ex) {
        console.log(ex);
    }
}

exports.get_profile = async (req,res) => {

    let student_id = req.body.student_id

    try {
        let data = await std_repo.get_timeline(student_id);
        console.log(data);
    }
    catch (ex) {
        console.log(ex);
    }
}

