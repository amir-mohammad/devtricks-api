const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) =>{
    const token = req.header('x-auth-token');
   if(!token){
       return res.status(403).json({messsage:'forbbiden token is not exist'})
   }

   try {
       const decoded = jwt.verify(token,config.get('secretKey'));
       req.user =  decoded.user;
       next();
   } catch (error) {
       res.status(403).json({message:'Token is not valid'});
   }
}