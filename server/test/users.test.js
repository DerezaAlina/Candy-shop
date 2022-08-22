import request from 'supertest'
import { validateEmail } from '../utils/utils.js'

describe('unit tests', () => {
    test('validate email - success', () => {
        expect(validateEmail('test@gmail.com')).toBeDefined()
    })

    test('validate email - unsuccess', () => {
        expect(validateEmail('testgmail.com')).toBeNull()
    })
})

describe('Users e2e tests', () => {
    const email = `${new Date().getTime()}@gmail.com`

    describe('succes flow', () => {
        test('user registration', async () => {
            await request('http://localhost:3000/api')
                .post('/users/registration')
                .send({ email, password: 'qweasd' })
                .expect(200)    
        })
    
        test('user login', async () => {
            const response = await request('http://localhost:3000/api')
                .post('/users/login')
                .send({ email, password: 'qweasd' })
                .expect(200)
            expect(response.body.user.email).toEqual(email)
        })

        test('get users', async () => {
            const response = await request('http://localhost:3000/api')
                .get('/users')
                .expect(200)
            expect(response.body.users.length).toBeGreaterThan(0)
        
        })
    })

    describe('unsucces flow', () => {
        test('user registration failed with short password', async () => {
            await request('http://localhost:3000/api')
                .post('/users/registration')
                .send({ email, password: '1234' })
                .expect(400)
        })

        test('user registration failed with not valid email', async () => {
            await request('http://localhost:3000/api')
                .post('/users/registration')
                .send({ email: 'testemail.com', password: '1234' })
                .expect(400)
        })

        test('user delete with wrong role', async () => {
            await request('http://localhost:3000/api')
                .delete('/users/1234')
                .expect(401)
        })
    })
}) 