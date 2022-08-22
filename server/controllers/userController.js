import bcryptjs from 'bcryptjs'
import ApiError from '../error/ApiError.js'
import { Users, Carts } from '../models/models.js'
import { validateEmail, generateJwt } from '../utils/utils.js'

class UsersController {
    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body

            if (!validateEmail(email)) {
                throw ApiError.badRequest('Invalid email')
            }
            if (password.length < 6) {
                throw ApiError.badRequest('Password should have more than 6 char')
            }

            const candidate = await Users.findOne({ where: { email } })
            if (candidate) {
                throw ApiError.badRequest('This user have been already exist')
            }

            const hashPassword = await bcryptjs.hash(password, 5)
            const user = await Users.create({ email, role, password: hashPassword })
            await Carts.create({ userId: user.id })
            const token = generateJwt(user.id, user.email, user.role)
            
            return res.send({ user, token })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async login(req, res, next) {    
        try {
            const {email, password} = req.body
            const user = await Users.findOne({ where: { email } })
            if (!user) {
                throw ApiError.internal('The user not found')
            }  

            let comparePassword = await bcryptjs.compare(password, user.password)
            if (!comparePassword) {
                throw ApiError.internal('Invalid password')
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.send({ user, token })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await Users.findAll()
            res.send({ users })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const user = await Users.destroy({ where: { id } })
            return res.send({ user })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }
}

export default new UsersController()