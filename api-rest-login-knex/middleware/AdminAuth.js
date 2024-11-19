const jwt = require('jsonwebtoken')

const secret = 'fasdlkçjfak16546fasd565556afds875fasx'

module.exports = function(req, res, next) {
  const authToken = req.headers['authorization']

  if (authToken != undefined) {
    const bearer = authToken.split(' ')
    const token = bearer[1]

    try {
      const decoded = jwt.verify(token, secret)
      //console.log(decoded)

      if (decoded.role == 1) {
        next()
      }else {
        res.status(403)
        res.send("Você não tem permissão para isso!")
        return
      }
      
    } catch (error) {
      res.status(403)
      res.send("Você não está autenticado")
      return
    }
    
  }else {
    res.status(403)
    res.send("Você não está autenticado")
    return
  }
}