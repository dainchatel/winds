const confirmOrigin = (req, res, next) => {
    console.log(req.headers, req.ipAddress)
    const { ALLOWED_ORIGIN } = process.env
    try {
      const { origin } = req.headers
      console.log(ALLOWED_ORIGIN, origin)
      if (!ALLOWED_ORIGIN) return next()
      if (origin !== ALLOWED_ORIGIN) throw new Error('Invalid credentials')
      return next()
    } catch (e) {
      console.log('i rejected the request')
      res.status(403)
      res.send({ message: e.message })
    }
  }
  
  module.exports = confirmOrigin