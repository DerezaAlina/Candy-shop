import ApiError from '../error/ApiError.js'

export function checkRole(role) {
    return function (req, res, next) {
        const { user } = req
        if(user.role != role) {
            throw ApiError.forbidden()
        }
        next()
    }
}   
