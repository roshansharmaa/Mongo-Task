import mongoose from "mongoose";
import dotenv from 'dotenv'
export const connetfun = async () => {
  try {
    mongoose.connect(process.env.MONGO_DATA || 'mongodb://localhost:27017/database')
    console.log("Mongo Connected")
  } catch (error) {
    console.log(error, 'Conneting database')
  }
}
const regesterModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true
  }

}, { timestamps: true })
export const User = mongoose.model('User', regesterModel)