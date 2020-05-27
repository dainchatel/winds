const { TOKEN } = require('config3')

const authWithToken = (req, res, next) => {
  try {
    const { authorization: sentToken } = req.headers
    if (!TOKEN) throw new Error('Route unavailable')
    if (sentToken !== TOKEN) throw new Error('Invalid credentials')
    next()
  } catch (e) {
    res.status(403)
    res.send(e.message)
  }
}

module.exports = authWithToken