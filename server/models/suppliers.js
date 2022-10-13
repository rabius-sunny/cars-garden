import mongoose from 'mongoose'
const { Schema, model } = mongoose

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    phone2: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    cars: [
      {
        type: Schema.Types.ObjectId,
        ref: 'cars'
      }
    ]
  },
  { timestamps: true }
)

export default model('supplier', supplierSchema)
