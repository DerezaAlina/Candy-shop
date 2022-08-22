import Router from 'express'
import typeController from '../controllers/typeController.js'
import { checkAccess } from '../middleware/checkAccessMiddleware.js'
import { checkRole } from '../middleware/checkRoleMiddleware.js'

const router = new Router()

router.post('/', checkAccess, checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', checkAccess, checkRole('ADMIN'), typeController.delete)

export default router