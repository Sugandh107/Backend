  const jwt = require('jsonwebtoken');
  const verifyToken = (req, res, next) => {
    // console.log(req.headers.authorization);
    if(!req.headers.authorization){
      return res.status(401).send({message: "unauthorized access"}); 
    }

    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    jwt.verify(token, "8cb3920556475ac0e1e9bc1a3500d43910ec491e041d709068257a55af51733df079d058a17731eac45189fa4d2dc93dfe59922d1ba4ea784e483d67cb0b740a", (err, decoded) => {
      if(err){
        return res.status(401).send({message: "token is invalid!"})
      }
      req.decoded = decoded;
      next();
    })
  }

  module.exports = verifyToken;