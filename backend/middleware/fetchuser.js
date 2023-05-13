var jwt = require('jsonwebtoken');

const JWT_SECRET = "shhhh";

const fetchuser =(req,res,next)=>{
// Get user from the jwt tokenand add id to req object
const token =req.header('auth-token');
if(!token)
{
    res.status(400).send({error:"Please authentiacate using a valid token"})
}

try {
    const data = jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
} catch (error) {
    res.status(400).send({error:"Please authentiacate using a valid token"})

}
}
module.exports=fetchuser;