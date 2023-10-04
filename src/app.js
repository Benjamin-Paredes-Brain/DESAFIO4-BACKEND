import express from 'express'
import { router as productsRouter } from './routes/products.router.js'
import { router as cartsRouter } from './routes/carts.router.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cartsRouter)
app.use(productsRouter)

app.listen(8080, 'localhost', () => {
    console.log('server is running in port 8080 w/ express')
})
