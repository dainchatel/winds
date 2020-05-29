const defense = (req, res, next) => {
    const { ALLOWED_ORIGIN, ERROR_TEXT = 'Thanks for checking out my work.' } = process.env
    try {
      const { origin } = req.headers
      if (req.headers['postman-token']) throw new Error(ERROR_TEXT)
      if (!ALLOWED_ORIGIN) return next()
      if (origin !== ALLOWED_ORIGIN) throw new Error(ERROR_TEXT)
      return next()
    } catch (e) {
      console.log('i rejected the request')
      res.status(403)
      res.send({ message: e.message })
    }
  }
  
  module.exports = defense