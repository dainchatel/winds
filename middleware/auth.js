const authWithToken = (req, res, next) => {
  console.log(req.headers, req.ipAddress)
  const { TOKEN } = process.env
  try {
    const { authorization: sentToken } = req.headers
    console.log(TOKEN, sentToken)
    if (!TOKEN) throw new Error('Route unavailable')
    if (sentToken !== TOKEN) throw new Error('Invalid credentials')
    next()
  } catch (e) {
    console.log('i rejected the request')
    res.status(403)
    res.send({ message: e.message })
  }
}

module.exports = authWithToken