const requestIp = require('request-ip');
 
const getIp = (req, res, next) => {
    const clientIp = requestIp.getClientIp(req)
    req.ipAddress = clientIp
    next()
}

module.exports = getIp