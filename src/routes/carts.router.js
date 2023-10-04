import { Router } from 'express'
import { cartCreateController, cartIdListController, cartProductAddController } from '../Helpers/controllers.js'
export const router = Router()

router.post('/api/carts', cartCreateController)

router.get('/api/carts/:cid', cartIdListController)

router.post('/api/carts/:cid/products/:pid', cartProductAddController)
