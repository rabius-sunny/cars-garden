import { Router } from 'express'
import { getCars } from '../controllers/suppliers.js'
import adminAuth from '../middlewares/adminAuth.js'

const supplierRouter = Router()

supplierRouter.get('/get-supplier-cars', adminAuth, getCars)

export default supplierRouter
