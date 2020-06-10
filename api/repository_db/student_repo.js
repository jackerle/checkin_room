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
 * @param {string} student_id 
 */
exports.removeStd = function(student_id){
    let sql = `delete from student_table where student_id = '${student_id}'`
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

/**
 * @param {number} room_id
 * @param {string} u_id
 */
exports.checkin = function(room_id,u_id){
    let sql = `insert into transaction (room_id,u_id,timestamp_checkin,status)
    values(${room_id},'${u_id}',CURRENT_TIMESTAMP,1);`
    return to_query(sql);
}

/**
 * @param {string} u_id
 */
exports.checkout = function(u_id){
    let sql = `update transaction
    set timestamp_checkout = CURRENT_TIMESTAMP,status = 0
    where u_id = '${u_id}';`
    return to_query(sql);
}

/**
 * @param {string} u_id
 */
exports.isRegis = function(u_id){
    let sql = `select * from student_table where u_id = '${u_id}';`
    return to_query(sql);
}