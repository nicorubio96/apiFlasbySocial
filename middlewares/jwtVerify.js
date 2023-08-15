const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }
  
    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }
      req.user = user;
      next();
    })};


module.exports =authenticateToken