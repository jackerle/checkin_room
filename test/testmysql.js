const mariadb = require('mariadb');



const pool = mariadb.createPool({
    host : 'localhost',
    user : 'root',
    password : '19114198',
})

pool.getConnection()
    .then(()=>{
        console.log("Success")
    })