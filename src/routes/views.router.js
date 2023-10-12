import { Router } from "express";   
import { productData } from "../Helpers/controllers.js";
export const router = Router()


router.get("/", (req, res) => {
    res.render('home', {
        productData
    })
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", { productData })
})

