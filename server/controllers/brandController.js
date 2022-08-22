import { Brands } from '../models/models.js'
import  ApiError  from '../error/ApiError.js'

class BrandController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const brandCheckExist = await Brands.findOne({ where: { name } })
            if (brandCheckExist) {
                return next(ApiError.badRequest('This brand have been already exist'))
            }

            const brand = await Brands.create({ name })
            return res.send({ brand })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brands.findAll()
            return res.send({ brands })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const brand = await Brands.destroy({ where: { id } })
            return res.send({ brand })
        } catch (err) {
            console.error(err?.message)
            next(err)
        } 
    }
}

export default new BrandController()