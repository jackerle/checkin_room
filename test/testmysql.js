const mariadb = require('mariadb');



const pool = mariadb.createPool({
    host : 'localhost',
    user : 'root',
    password : '19114198',
    database : 'checkin_room',
    connectionLimit : 10
})

pool.getConnection()
    .then((con)=>{
        con.query('show tables;').then(
            (res) => {
                console.log(res)
                con.end()
            }
        )
    }).catch(err => {

    })