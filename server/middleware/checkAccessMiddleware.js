import jwt  from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'

export function checkAccess(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1]
       
        if(!token) {
            throw ApiError.unauthorized()
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err) {
                console.error({ message: err?.message, section: 'checkAccess' })
                throw ApiError.unauthorized()
            }
            req.user = decoded
        })

        next()
    } catch (err) {
        console.error(err?.message)
        next(err)
    }
}