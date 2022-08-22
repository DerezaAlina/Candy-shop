import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import sequelize from './db.js'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHeandlingMiddleware.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000

const app = express()

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Candy-shop API',
			version: '1.0.0',
			description: 'Express Candy-shop API'
		},
		servers: [
			{
				url: `http://localhost:${ PORT }/api`,
			},
		],
	},
	apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve('/server', 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/about', (req, res) => {
	res.sendFile('static/about.html', {root: __dirname})
})

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${ PORT }`)
        })
    } catch (error) { 
        console.log(error.message)
    }
}

start()