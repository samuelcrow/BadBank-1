const jwt = require("jsonwebtoken");

const SECRET = "MY_SECRET"

// generate a token for a user by collecting their info
 const getToken = (user) => {

  return jwt.sign({
    name: user.name,
    email: user.email,
    password: user.password
  }, SECRET, {expiresIn: '1h'}
  )
}


// protect a route from being accessed without a token
 const authorizeUser = (req, res, next) => {
   // ggrabbing the token from the header
  const token = req.headers.authorization;

  // check on postman. 
  if(token){
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, SECRET, (err, decode) => {
      if(err){
        return res.status(401).send({msg: 'Invalid Token'})
      }
      req.user = decode;
      next();
      return
    })
  }else{
    return res.status(401).send({msg: 'Token is not supplied'})
  }
}

module.exports = {getToken, authorizeUser}

