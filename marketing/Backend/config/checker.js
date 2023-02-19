const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret@123'

const checker = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please provide token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err){
        res.status(401).send({error: "Please provide a valid token"})
    }
}

module.exports = checker