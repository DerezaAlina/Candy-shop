import Router from 'express'
import brandRouter from './brandRouter.js'
import productRouter from './productRouter.js'
import typeRouter from './typeRouter.js'
import userRouter from './userRouter.js'

const router = new Router()

router.use('/users', userRouter)
router.use('/types', typeRouter)
router.use('/brands', brandRouter)
router.use('/products', productRouter)

export default router