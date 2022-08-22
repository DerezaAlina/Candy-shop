import Router from 'express'
import CartController from '../controllers/cartController.js'

const router = new Router()

router.get('/:userId/cart', CartController.getAll)
router.post('/:userId/cart', CartController.addToCart)
router.delete('/:userId/cart/:cartProductId', CartController.deleteOne)
router.delete('/:userId/cart', CartController.deleteAll)
router.get('/:userId/cart/checkout', CartController.checkout)

export default router