const mariadb = require('mariadb');
const env = require('./../../env.json')



var pool = mariadb.createPool({
    host : 'localhost',
    user : env.USERNAME_DB,
    password : env.PASSWORD_DB,
    database : env.DATABASE,
    connectionLimit : 20,
    connectTimeout:15000,
    idleTimeout:1

});


const to_query = function(sql){
    return new Promise(async (resolve,reject)=>{
        try{
            let _pool = await pool.getConnection();
            let res_query = await _pool.query(sql);
            _pool.release();
            resolve(res_query);
        }
        catch(ex){
            console.log(ex)
            reject(ex)
        }
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
exports.checkout = function(u_id,room_id){
    let sql = `update transaction
    set timestamp_checkout = CURRENT_TIMESTAMP,status = 0,role = 0
    where u_id = '${u_id}' and status = 1 and room_id = ${room_id};`
    return to_query(sql);
}


exports.getAllTrans = function(){
    let sql = `select * from transaction`
    return to_query(sql);
}


/**
 * 
 * @param {string} u_id 
 * @param {number} room_id 
 */
exports.getInfo = function(u_id,room_id){
    let sql = `select 
    case when exists(
        select * 
        from transaction
        where u_id = '${u_id}'
        and room_id = ${room_id}
        and status = 1	
    ) and exists(
        select * 
        from student_table
        where u_id = '${u_id}'
    )
      then 'has account and checkin'
    when exists(
        select * 
        from student_table
        where u_id = '${u_id}'
    )
    then 'has account no checkin'
    else 'no account'
    end as msg,
    student_table.student_id as student_id,
    student_table.student_name as student_name,
    room_table.room_name as room_name,
    room_table.capacity as capacity
    from student_table,room_table
    where student_table.u_id = '${u_id}'
    and room_table.room_id = ${room_id}`
    return to_query(sql)
}


/**
 * 
 * @param {string} u_id 
 */
exports.getTran = function(u_id,room_id){
    let sql = `select * from transaction where u_id = '${u_id}' and status = 1 and room_id = ${room_id}`;
    return to_query(sql);
}

/**
 * @param {string} u_id
 */
exports.hasAccount = function(u_id){
    let sql = `select * from student_table where u_id = '${u_id}';`
    return to_query(sql);
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
exports.login = function(username,hash_password){
    let sql = `select * from admin where username = '${username}' and  hash_password = '${hash_password}'`
    return to_query(sql);
}


/**
 * 
 * @param {string} username 
 * @param {string} hash_password 
 * @param {string} name 
 * @param {string} about 
 */
exports.register = function(username,hash_password,name,about){
    let sql = `insert into admin (username,hash_password,name,role,about)
    values ('${username}','${hash_password}','${name}',1,'${about}');`
    return to_query(sql);
}


/**
 * @param {string} room_id
 */
exports.getCheckin = function(room_id){
    let sql = `select student_table.u_id as u_id ,student_table.student_name as student_name,student_table.student_id as student_id,transaction.timestamp_checkin as timestamp_checkin from transaction,student_table
    where transaction.room_id = ${room_id} and transaction.status = 1 and transaction.u_id = student_table.u_id;`
    return to_query(sql);
}



exports.getAllClass = function(){
    let sql = `select * from class_table;`
    return to_query(sql);
}

exports.getSchedule = function (class_id,class_sect){
    let sql = `select 
    class_table.class_id as class_id,
    class_table.class_name as class_name,
    class_schedule.class_day as class_day,
    class_schedule.class_start_time as class_start_time,
    class_schedule.class_end_time as class_end_time,
    room_table.room_name as room_name
    from class_table,class_schedule,room_table
    where class_schedule.room_id = room_table.room_id
    and class_schedule.class_id = class_table.class_id
    and class_schedule.class_sect = class_table.class_sect
    and class_table.class_id = '${class_id}'
    and class_table.class_sect = ${class_sect};
    `
    return to_query(sql);
}

exports.getReg = function(class_id,class_sect){
    let sql = `select 
    student_table.student_id as student_id,
    student_table.student_name as student_name
    from reg_class,student_table
    where reg_class.class_id = '${class_id}'
    and reg_class.class_sect = ${class_sect}
    and reg_class.student_id = student_table.student_id;`
    return to_query(sql);
}


exports.getClass_room = function(room_id,day){
    let sql = `select class_table.class_id as class_id,
    class_table.class_sect as class_sect,
    class_schedule.class_start_time as class_start_time,
    class_schedule.class_end_time as class_end_time,
    class_table.class_name as class_name,
    room_table.room_id as room_id,
    room_table.room_name as room_name,
    room_table.capacity as capacity
    from 
    class_schedule,class_table,room_table
    where class_schedule.class_day = ${day}
    and class_schedule.room_id = ${room_id}
    and class_schedule.room_id = room_table.room_id
    and class_table.class_sect = class_schedule.class_sect
    and class_table.class_id = class_schedule.class_id
    order by class_schedule.class_start_time;`
    return to_query(sql)
}


/**
 * 
 * @param {string} class_id 
 * @param {number} class_sect 
 * @param {string} class_name 
 * @param {Array} schedule 
 */
exports.add_class = function(class_id,class_sect,class_name,schedule){
    let sql_1 = `insert into class_table (class_id,class_sect,class_name)
    values ('${class_id}',${class_sect},'${class_name}')`
    to_query(sql_1)
    console.log(schedule)
    schedule.map(e => {
        let sql = `insert into class_schedule (class_id,class_sect,class_day,class_start_time,class_end_time,room_id) values('${class_id}',${class_sect},${e.day},'${e.start_time}:00','${e.end_time}:00',${e.room_id});`
        console.log(sql)
        to_query(sql)
    })
    return({
        "success":true
    })

}


exports.getroom_in = function(){
    let sql = `select room_table.room_id as room_id,
    room_table.room_name as room_name,
    room_table.capacity as capacity,
    count(*) as count
    
    
    from  room_table,transaction
    where room_table.room_id = transaction.room_id
    and transaction.status = 1
    group by room_table.room_id`;
    return to_query(sql);
}


exports.getClass = function(){
    let sql = `select * from class_table`
    return to_query(sql)
}


exports.get_room_from_class = function(class_id,class_sect){
    let sql = `select 
    room_table.room_id as room_id,
    room_table.room_name as room_name,
    room_table.capacity as capacity
    from class_schedule,room_table
    where class_id = '${class_id}'
    and class_sect = ${class_sect}
    and class_schedule.room_id = room_table.room_id
    group by room_table.room_id;`;
    return to_query(sql)
}

exports.get_student_status = function (room){
    let sql = `select student_table.student_id as student_id from 
    transaction,student_table
    where transaction.u_id = student_table.u_id and (`
    room.map(e=>{
        sql+= `transaction.room_id = ${e.room_id} or `
    })
    sql += `1!=1) and status = 1;`
    return to_query(sql)
}
