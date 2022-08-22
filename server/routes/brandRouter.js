import Router from 'express'
import brandController from '../controllers/brandController.js'
import { checkAccess } from '../middleware/checkAccessMiddleware.js'
import { checkRole } from '../middleware/checkRoleMiddleware.js'

const router = new Router()

router.post('/', checkAccess, checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', checkAccess, checkRole('ADMIN'), brandController.delete)

export default router