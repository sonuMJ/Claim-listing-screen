const JWT = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET;

//sign
const JwtSign = async (id,email,isAdmin) => {
    return new Promise(async (resolve, reject) => {
        let token = await JWT.sign({
            _id : id,
            email : email,
            isAdmin : isAdmin
        },SECRET, {
            //expire in 2 hr
            expiresIn:'2h'
        })
        resolve(token)
    })
}

//parse

const JwtParse = (tokenid) => {
    return new Promise((resolve, reject) =>{
        if(!tokenid){
            reject({message:"Token required",status:403})
        }
        const token = tokenid.split(" ")[1];
        
        JWT.verify(token, SECRET, (err, user) => {
            if(err){
                reject({message:"Invalid token",status:401})
            }
            //console.log(err, user);
            resolve(user)
        })
    })
    

}

//authenticate (Middleware)

const AuthenticateUser = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return res.status(403).json({
            message : "Unauthorized access"
        })
    }
    const token = bearerToken.split(" ")[1];
    await JWT.verify(token,SECRET,(err, user)=>{
        if(err){
            return res.status(401).json({message:"Invalid token. Please login again"})
        }else{
            next();
        }
    })
}

const AuthenticateAdmin = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return res.status(403).json({
            message : "Unauthorized access"
        })
    }
    const token = bearerToken.split(" ")[1];
    await JWT.verify(token,SECRET,(err, user)=>{
        if(err){
            return res.status(401).json({message:"Invalid token. Please login again"})
        }
        if(!user.isAdmin){
            return res.status(403).json({message:"Unauthorized access. You dont have privilege to access this!"})
        }
        next()
    })
}


module.exports = {JwtSign, JwtParse, AuthenticateUser, AuthenticateAdmin}