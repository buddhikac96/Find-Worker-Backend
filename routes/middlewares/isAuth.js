// Checks if a request carries a logged in session cookie and if the route is
// not whitelisted and the session cookie is not flagged logged in, the request
// will be declined from proceeding
const isAuthMW = (req,res,next)=>{

    var whiteList = ['/user/login','/dataservices/getallskills','/booknow/booknow','/user/register','/bookLater/search']
    if(whiteList.includes(req.path)) {
        next();
      }
    else{
        if(req.session.loggedin){
            next()
        }
        else{
            res.status(401).json({
                status:401,
                message:"Unauthorized Activity"
            })
         
        }
    }
}

module.exports = isAuthMW