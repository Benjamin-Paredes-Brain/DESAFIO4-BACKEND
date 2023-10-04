import { Router } from 'express'
import {
    productIdController,
    productLimitController,
    productAddController,
    productUpdateController,
    productDeleteController,
} from '../Helpers/controllers.js'
export const router = Router()

router.get('/api/products', productLimitController)
router.get('/api/products/:pid', productIdController)

router.post('/', productAddController)

router.put('/api/products/:pid', productUpdateController)

router.delete('/api/products/:pid', productDeleteController)
