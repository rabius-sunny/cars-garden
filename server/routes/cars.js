import { Router } from 'express'

import { createCar, getCars } from '../controllers/cars.js'
import adminAuth from '../middlewares/adminAuth.js'

const router = Router()

router.route('/cars').get(getCars).post(adminAuth, createCar)

export default router
