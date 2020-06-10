const mariadb = require('mariadb');
const env = require('./../../env.json')



var pool = mariadb.createPool({
    host : 'localhost',
    user : 'root',
    password : env.PASSWORD_DB,
    database : env.DATABASE,
    connectionLimit : 10
});


const to_query = function(sql){
    return new Promise((resolve,reject)=>{
        pool.getConnection()
        .then((con)=>{
            con.query(sql)
            .then(
                res =>{
                    resolve(res)
                    con.end()
                }
            )
        }).catch(err =>{
            reject(err)
        })
    })
}


/**
 * @param {string} u_id From LINE userid
 * @param {string} student_id Student id
 * @param {string} student_name Strudent name 
 */
exports.register_std = function(u_id,student_id,student_name){
    let sql = `insert into student_table(u_id,student_id,student_name) 
    values ('${u_id}','${student_id}','${student_name}');`
    return to_query(sql);
}

exports.getAllStd = function(){
    let sql = `select * from student_table;`
    return to_query(sql);
}


/**
 * @param {string} room_name Name of room which regis
 * @param {number} capacity Maximum for room  
 */
exports.register_room = function(room_name,capacity){
    let sql = `insert into room_table(room_name,capacity)
    values ('${room_name}',${capacity});`
    return to_query(sql);
}

exports.getAllRoom = function(){
    let sql = `select * from room_table;`
    return to_query(sql);
}