import { randomUUID } from 'crypto'
import { LiqPay } from '../utils/Liqpay.js'
import { Products, Users, Carts, CartsProducts } from '../models/models.js'

class CartController {
    async addToCart(req, res, next) {
        try {
            const { userId } = req.params
            const { productId } = req.body

            const user = await Users.findOne({
                where: { id: userId },
                include: [{ model: Carts, as: 'cart' }]
            })
            const cartId = user.cart.id

            const cartProduct = await CartsProducts.create({ cartId, productId })
            
            return res.send({ cartProduct })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.params

            const user = await Users.findOne({
                where: { id: userId },
                include: [{ model: Carts, as: 'cart' }]
            })
            const cartId = user.cart.id

            const cartProducts = await CartsProducts.findAll({ where: { cartId } })
            
            return res.send({ cartProducts })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async deleteAll(req, res, next) {
        try {
            const { userId } = req.params

            const user = await Users.findOne({
                where: { id: userId },
                include: [{ model: Carts, as: 'cart' }]
            })
            const cartId = user.cart.id

            const cartProducts = await CartsProducts.destroy({ where: { cartId } })
            
            return res.send({ cartProducts })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { cartProductId } = req.params

            const cartProducts = await CartsProducts.destroy({ where: { id: cartProductId } })
            
            return res.send({ cartProducts })
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }

    async checkout(req, res, next) {
        try {
            const { userId } = req.params

            const user = await Users.findOne({
                where: { id: userId },
                include: [{ model: Carts, as: 'cart' }]
            })
            const cartId = user.cart.id
            const cartProducts = await CartsProducts.findAll({ where: { cartId } })

            if (!cartProducts.length) {
                res.send('Your cart is empty')
            }

            const orderList = []
            const products = []
            const productPrice = []

            cartProducts.forEach(cartProduct => {
                if (!products.includes(cartProduct.productId)) {
                    products.push(cartProduct.productId)
                }
            })

            for await (let productId of products) {
                const product = await Products.findOne({ where: { id: productId } })
                productPrice.push({ productId: product.id, price: product.price })
            }

            for(let i = 0; i < products.length; i++) {
                if (products[i] === productPrice[i].productId) {
                    orderList[i] = { 
                        productId: products[i],
                        amount: 0,
                        price: productPrice[i].price 
                    }
                }
                
                for(let j = 0; j < cartProducts.length; j++) {
                    if (cartProducts[j].productId === products[i]) {
                        orderList[i].amount++
                    }
                }
            }

            let totalPrice = 0
            
            orderList.forEach(order => {
                totalPrice = totalPrice + (order.price * order.amount)
            })

            const liqpayClient =  new LiqPay(
                process.env.LIQPAY_PUBLIC_KEY,
                process.env.LIQPAY_PRIVATE_KEY
            )
            const html = liqpayClient.cnb_form({
                'action'         : 'pay',
                'amount'         : `${totalPrice}`,
                'currency'       : 'UAH',
                'description'    : JSON.stringify(orderList),
                'order_id'       : randomUUID(),
                'version'        : '3'
            })
            return res.send(
                `<html> <head>Click to pay!</head><body>${html}</body></html>`
            )
        } catch (err) {
            console.error(err?.message)
            next(err)
        }
    }
}

export default new CartController()