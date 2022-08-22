import Router from 'express'
import ProductController from '../controllers/productController.js'
import { checkAccess } from '../middleware/checkAccessMiddleware.js'
import { checkRole } from '../middleware/checkRoleMiddleware.js'

const router = new Router()

router.post('/', checkAccess, checkRole('ADMIN'), ProductController.create)
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.put('/:id', checkAccess, checkRole('ADMIN'), ProductController.update)
router.delete('/:id', checkAccess, checkRole('ADMIN'), ProductController.deleteOne)

export default router