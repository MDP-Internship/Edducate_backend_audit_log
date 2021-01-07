import mongoose, { model } from 'mongoose'

const userLogSchema =  mongoose.Schema({
  name: {type: String},
  surname: {type: String},
  email: {type: String},
  password: {type: String},
  date : {
    type: Date,
    default: Date.now()
  }
})

export default model('UserLog', userLogSchema)
