import path from 'path'
import { randomUUID } from 'crypto'
import { fileURLToPath } from 'url'
import { Products, ProductInfos } from '../models/models.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class ProductsController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = randomUUID() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Products.create({ 
                name, price, brandId, typeId, img: fileName
            })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    ProductInfos.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.send({ product })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }    
    }

    async getAll(req, res, next) {
        try {
            let { brandId, typeId, limit, page } = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            let products
            if (!brandId && !typeId) {
                products = await Products.findAndCountAll({ limit, offset })
            }
            if (brandId && !typeId) {
                products = await Products.findAndCountAll({ where: { brandId }, limit, offset })
            }
            if (!brandId && typeId) {
                products = await Products.findAndCountAll({ where: { typeId }, limit, offset })
            }
            if (brandId && typeId) {
                products = await Products.findAndCountAll({ where: { typeId, brandId }, limit, offset })
            }
            return res.send({ products })
        } catch (err) {
            console.error(err?.message)
            next(err)
        } 
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await Products.findOne({   
                where: { id },
                include: [{ model: ProductInfos, as: 'info' }]
            })
            return res.send({ product })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, price } = req.body
            const { img } = req.file
            const product = await Products.update({ where: { id } }, { name, price, img })
            return res.send({ product })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await Products.destroy({ where: { id } })
            return res.send({ product })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }
}

export default new ProductsController()