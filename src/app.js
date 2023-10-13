import express from 'express'
import handlebars from "express-handlebars"
import { Server } from 'socket.io'
import { router as productsRouter } from './routes/products.router.js'
import { router as cartsRouter } from './routes/carts.router.js'
import { router as viewsRouter } from './routes/views.router.js'
import { productData } from './Helpers/controllers.js'

const app = express()

const httpServer = app.listen(8080, () => console.log('server is running in port 8080 w/ express'))
const socketServer = new Server(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine("handlebars", handlebars.engine())
app.set("views", process.cwd() + "/src/views")
app.set("view engine", "handlebars")
app.use(express.static(process.cwd() + "/public"));
app.use(cartsRouter)
app.use(productsRouter)
app.use(viewsRouter)

socketServer.on("connection", socket => {
    console.log("handshake!");

    socket.on("addProduct", data => {
        const lastProductId = productData.reduce((maxId, product) => {
            return product.id > maxId ? product.id : maxId
        }, -1)

        const newProduct = { title: data.title };
        newProduct.id = lastProductId + 1
        productData.push(newProduct)
        socketServer.emit("updateProducts", productData);
    });

    socket.on("deleteProduct", data => {
        const productTitle = data.title;
        const index = productData.findIndex((product) => product.title === productTitle);
        if (index !== -1) {
            productData.splice(index, 1);
            socketServer.emit("updateProducts", productData);
        }
    });
});



