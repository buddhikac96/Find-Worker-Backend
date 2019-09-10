var bcrypt = require('bcryptjs');
const {spAsync} = require('../../db/index');

exports.regUser = function(req, res){

    bcrypt.hash(req.body.Password, 10, function(err, hash){
        req.body.Password=hash;
        console.log(hash)
        let params = []
        Object.keys(req.body).forEach(key=>{
            params.push([key,req.body[key]])
        })
    
        spAsync('dbo.UserRegister',params).then(result=>{
            if(result.returnValue===1){
                res.status(200).json({
                    status:201,
                    result:result,
                    message:"User Created"
                })
            }
            else{
                res.status(200).json({
                    status:400,
                    result:result,
                    message:"User Already Exists"
                })
            }
        })
       
    });
}

//login user
exports.logUser = async function(req, res){
    spAsync('dbo.SelectUser',[['UserEmail',req.body.UserEmail]]).then(results=>{
        if(results.returnValue){
            let user = results.recordset[0]
            bcrypt.compare(req.body.Password , user.Password, (error, result)=>{
                if(!error){
                    console.log(user)
                    if(result){
                        req.session.loggedin = true;
                        req.session.email = user.UserEmail;
                        req.session.UserId = user.UserId;
                        req.session.type = user.UserType?'worker':'Client';
                        res.status(200).json({
                            status:200,
                            result:{
                                sessionEmail:req.session.email,
                                sessionType:req.session.type,
                                UserId:req.session.UserId
                            },
                            message:'Authorized'
                        })
                       
                        res.end()   
                    }
                    else{
                        res.status(200).json({
                            status:401,
                            message:'Unauthorized'
                        })
                    }
                }
                else{
                    res.status(500).json({
                        status:500,
                        result:error,
                        message:'Internal Server Error'
                    })
                }
            })
        }
        else{
            res.status(200).json({
                status:404,
                message:'User Not Found'
            })
        }
    })
}

exports.logoutUser = function(req, res){
    console.log(req.session.loggedin);
    console.log(req.session.email);
    req.session.loggedin=false;
    req.session.email="";
    console.log(req.session.loggedin);
    console.log(req.session.email);
    console.log('user logout successfully');
    res.end();
    
}