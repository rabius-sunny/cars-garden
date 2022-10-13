import carModel from '../models/cars.js'
import supplierModel from '../models/suppliers.js'
import userModel from '../models/user.js'

import jwt from 'jsonwebtoken'
const { sign } = jwt
import bcrypt from 'bcrypt'

const getAdminToken = user => sign(user, 'df34#$*&dj)(!@)dfkjdfjk')
const getUserToken = user => sign(user, 'ddf3484#*$&!)@()4334dkf')

export const createSupplier = async (req, res) => {
  const { name, email, phone, phone2, location, password } = req.body

  try {
    const checkEmail = await supplierModel.findOne({ email })
    if (checkEmail) {
      return res.status(401).json({ message: 'email already in use' })
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const response = await supplierModel.create({
      name,
      email,
      password: hash,
      phone,
      phone2,
      location
    })
    const token = getAdminToken({
      email: response.email,
      id: response._id
    })
    res.status(200).json({ message: 'ok', token })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const loginSupplier = async (req, res) => {
  // comparing hashed password
  try {
    const user = await supplierModel.findOne({
      email: req.body.email
    })
    const _compare = await bcrypt.compare(req.body.password, user.password)
    if (!_compare) {
      return res.status(401).json({ message: 'wrong credentials' })
    }
    const token = getAdminToken({
      email: user.email,
      id: user._id
    })
    res.status(200).json({ message: 'ok', token })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const createUser = async (req, res) => {
  const { name, email, phone, address, password } = req.body

  try {
    const checkEmail = await userModel.findOne({ email })
    if (checkEmail) {
      return res.status(401).json({ message: 'email already in use' })
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const response = await userModel.create({
      name,
      email,
      password: hash,
      phone,
      address
    })
    const token = getUserToken({
      email: response.email,
      id: response._id
    })
    res.status(200).json({ message: 'ok', token })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email
    })
    // comparing hashed password
    const _compare = await bcrypt.compare(req.body.password, user.password)
    if (!_compare) {
      return res.status(401).json({ message: 'wrong credentials' })
    }
    const token = getUserToken({
      email: user.email,
      id: user._id
    })
    res.status(200).json({ message: 'ok', token })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const createCar = async (req, res) => {
  try {
    const response = await carModel.create(req.body)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}
