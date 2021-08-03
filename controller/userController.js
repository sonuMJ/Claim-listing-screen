const User = require('../models/User')
const bcrypt = require('bcrypt')
const JwtToken = require('../security/Jwttoken')


const saltRound = 10;

exports.CreateUser = async (req,res) => {
    try {
        const {firstname,lastname,email,role,password,address,city,pincode} = req.body
    
        if(!firstname || !lastname || !email || !password || !role){
            return res.json({message : "field can't be empty!"}).status(400);
        }

        let userExist = await User.findOne({email : email})
        if(userExist){
            return res.json({message : "Email already registered!!"}).status(409);
        }
        //bcrypt
        let hashedPassword = await bcrypt.hash(password, saltRound)

        const user = new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            role:role,
            password:hashedPassword,
            address:address || "",
            city:city || "",
            pincode:pincode || ""
        })
        user.save()
            .then(data => {
                return res.json(data)
            })
            .catch(err => {
                return res.json({message : err.message || "Something went wrong"})
                .status(500)
            })
            
    } catch (error) {
        return res.json({message : error.message || "Something went wrong"})
        .status(500)
    }

    

}

exports.LoginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({message : "field can't be empty!"}).status(400);
    }

    const user = await User.findOne({email : email}) 
    if(user){
        let token = await JwtToken.JwtSign(user._id,email,user.role === "admin" ? true : false);
        return res.json({
            email : email,
            name : user.firstname,
            token
        })
    }
    return res.json({message : "Invalid Credentials"}).status(400)
}

exports.ResetPassword = async (req, res) => {
    //validate token from headers
    try {
       let tokenUser = await JwtToken.JwtParse(req.headers.authorization);
       const {newpassword, confirmpassword} = req.body;
       if(!newpassword || !confirmpassword){
            return res.json({message:"field can't be empty!"}).status(400)
       }
       if(newpassword === confirmpassword){
        let user = await User.findOne({email:tokenUser.email});
        if(!user){
            return res.json({message:"Unauthorized access"}).status(400)
        }
        user.password = await bcrypt.hash(newpassword, saltRound)
        user.save()
            .then(data => {
                return res.json({message:"password changed successfully"})
            })
            .catch(err => {
                return res.json({message : err.message || "Something went wrong"})
                .status(500)
            })
       }else{
        return res.json({message:"Password mismatch"}).status(400)
       }
        
    } catch (error) {
        return res.status(error.status).json({message : error.message})
    }
    
}
exports.ListUser = async (req, res) =>{
    let users = await User.find()
    if(users){
        return res.json({users})
    }else{
        return res.json({message:"not found"}).status(404)
    }
}