//Connects to MSSQL Connection Pool and returns the Pool 
const db = require('mssql');
const config = require('../config/keys')

 const conn = new db.ConnectionPool(config.db).connect()
.then(conn=>{
    console.log("Connected to Database")
    return conn
})
.catch(err=>{console.error(err)})

// Executes Stores Procedures Asynchronously and returns Resulting Recordset =========================
const spAsync = async (spName,inputs=[])=>{
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{conn.then(conn=>{
            let request = new db.Request(conn);
            inputs.forEach(input=>{
                //Creates Request Inputs 
                if(input.length===3){
                    request.input(input[0],input[2],input[1])
                }
                else{
                    request.input(input[0],input[1])
                }
            })
            request.execute(spName,(err,result)=>{
                if(!err){
                    resolve(result)
                    reject('Connection Timed Out')
                }
                else{
                    console.error(err)
                    resolve(err)
                }
            })
        })
    },1)
    })

   

    let result = await promise;
    return result
   
} 


module.exports.spAsync = spAsync
module.exports.db = db
module.exports.conn = conn

