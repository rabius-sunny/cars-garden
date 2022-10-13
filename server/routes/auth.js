import { Router } from 'express'
import {
  createCar,
  createSupplier,
  createUser,
  loginSupplier,
  loginUser
} from '../controllers/auth.js'

const router = Router()

router.post('/signup-supplier', createSupplier)
router.post('/login-supplier', loginSupplier)
router.post('/signup-user', createUser)
router.post('/login-user', loginUser)

router.post('/cars', createCar)

export default router
