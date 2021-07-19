const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async (req, res, next) => {
    if(req.method === 'OPTIONS') return

    try {
        
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            res.status(401).json({message: "Not authorization"})
        }

        const decoded = jwt.verify(token, config.get('jwt-secret'))
        req.user = decoded

        next()

    } catch (e) {
        res.status(401).json({message: "Not authorization"})
    }

}