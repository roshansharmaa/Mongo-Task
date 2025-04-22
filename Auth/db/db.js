import mongoose from "mongoose";
export const connetfun = async () => {
  try {
    mongoose.connect(process.env.MONGO_DATA||'mongodb+srv://roshansharma2005345:roshansharma2005345@cluster0.bvxak1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Mongo Connected")
  } catch (error) {
    console.log(error, 'Conneting database')
  }
}
const regesterModel = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  , confpassword: {
    type: String,
    required: true
  }
}, { timestamps: true })
export const User = mongoose.model('User', regesterModel)