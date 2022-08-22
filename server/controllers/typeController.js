import { Types } from '../models/models.js'
import  ApiError  from '../error/ApiError.js'

class TypesController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const typeCheckExist = await Types.findOne({ where: { name } })
            if (typeCheckExist) {
                throw ApiError.badRequest('This type have been already exist')
            }
    
            const type = await Types.create({ name })
            return res.send({ type })  
        } catch (err) {
            console.error(err?.message)
            next(err)
        }       
    }

    async getAll(req, res, next) {
        try {
            const types = await Types.findAll()
            return res.send({ types })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
        
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const type = await Types.destroy({ where: { id } })
            return res.send({ type })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }
}

export default new TypesController()