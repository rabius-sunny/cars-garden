import mongoose from 'mongoose'
const { connect } = mongoose

const connection = async () => {
  try {
    const response = await connect(
      /* process.env.URL */ 'mongodb+srv://user_2:266696687MongoDbUser2@cluster0.jat59.mongodb.net/cars?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    )
    console.log('database connected successfully')
  } catch (error) {
    console.log(error)
  }
}

export default connection
