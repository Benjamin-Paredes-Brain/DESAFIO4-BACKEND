import express from 'express'
import handlebars from "express-handlebars"
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import { router as productsRouter } from './routes/products.router.js'
import { router as cartsRouter } from './routes/carts.router.js'
import { router as viewsRouter } from './routes/views.router.js'

const app = express()

const httpServer = app.listen(8080, () => console.log('server is running in port 8080 w/ express'))
const socketServer = new Server(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use("/static", express.static(__dirname + "/public"));
app.use(cartsRouter)
app.use(productsRouter)
app.use(viewsRouter)

socketServer.on("connection", socket => {
    console.log("handshake!")

    socket.on("message", data => {
        console.log(data)
    })
})


