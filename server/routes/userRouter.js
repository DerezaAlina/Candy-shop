import Router from 'express'
import UserController from '../controllers/userController.js'
import { checkAccess } from '../middleware/checkAccessMiddleware.js'
import { checkRole } from '../middleware/checkRoleMiddleware.js'
import cartRouter from '../routes/cartRouter.js'

const router = new Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email 
 *         - role 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           format: email  
 *           description: The user email
 *         password:
 *           type: string
 *           format: password
 *           description: The user hashed password
 *         role:
 *           type: string
 *           description: The user role (USER|ADMIN)
 *         createdAt:
 *           type: string
 *           format: date-time   
 *           description: The user created at time
 *         updatedAt:
 *           type: string
 *           format: date-time   
 *           description: The user created at time
 *       example:
 *         id: 4ec4cdd2-32e1-4ac5-bae2-9afc9e60920f
 *         email: user@gmail.com
 *         password: ftne1osdfkmb4enkadkvm7dvnfbv
 *         role: USER
 *         createdAt: 2022-08-21T22:10:07.584Z
 *         updatedAt: 2022-08-21T22:11:05.467Z  
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */

/**
 * @swagger
 * /users/registration:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string   
 *               password: 
 *                 type: string 
 *               role: 
 *                 type: string  
 *             required:
 *               - email
 *               - password     
 *     responses:
 *       200:
 *         description: Create user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:    
 *                   $ref: '#/components/schemas/User'
 *                 token: 
 *                   type: string
 *       500: 
 *         description: Internal server error
 */

router.post('/registration', UserController.registration)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string   
 *               password: 
 *                 type: string  
 *             required:
 *               - email
 *               - password     
 *     responses:
 *       200:
 *         description: Login user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:    
 *                   $ref: '#/components/schemas/User'
 *                 token: 
 *                   type: string
 *       500: 
 *         description: Internal server error
 */

router.post('/login', UserController.login)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500: 
 *         description: Internal server error
 */

router.get('/', UserController.getAll)

/**
 * @swagger
 * '/users/{id}':
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - description: User id
 *         name: id
 *         in: path
 *         required: true
 *         schema: 
 *           type: string       
 *     responses:
 *       200:
 *         description: Delete user
 *       401: 
 *         description: Unauthorized
 *       403: 
 *         description: Forbidden   
 *       500: 
 *         description: Internal server error
 */

router.delete('/:id', checkAccess, checkRole('ADMIN'), UserController.delete)

router.use('/', cartRouter)

export default router