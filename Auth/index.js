import express from 'express'
import { connetfun, User } from './db/db.js';
import cors from 'cors'
import bcrypt from 'bcrypt'
import generatetoken from './db/token.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true              
}));
app.use(cookieParser())
dotenv.config()
const PORT = 8000;
app.get('/', (req, res) => {
  res.status(200).send({ staus: "WELCOME TO X PAGE" })
})
app.get('/alldata', async (req, res) => {
  try {
    let alldata = await User.find({})
    return res.status(200).send({ status: "Get all data", data: alldata })
  } catch (error) {
    return res.status(400).send({ status: 'Error while getting data' })
  }
})
app.post('/regester', async (req, res) => {
  const { email, password, confpassword } = req.body;
  try {
    if (!email) {
      return res.send({ error: true, status: 'Email is requird', })
    }
    let alredyuser = await User.findOne({ email: email })
    if (alredyuser) {
      return res.send({ error: true, status: `User Alresy Exist `, })
    }
    if (!password) {
      return res.send({ error: true, status: 'password is requird', })
    }
    if (password !== confpassword) {
      return res.send({ error: true, status: 'password Dosnt match', })
    }
    if (email && password && confpassword) {
      let hashpassword = await bcrypt.hash(password, 5)
      const createduser = await User.create({
        email: email,
        password: hashpassword,
      })
      let token = generatetoken(createduser._id)
      res.cookie("token", token, { httpOnly: false, secure: false, sameSite: 'strict', maxAge: 20 * 1000 })
      return res.status(201).send({ error: false, status: 'User created', createduser: createduser, id: createduser.id })
      //save mongo data
    }
  } catch (error) {
    console.log(error, "Error in data")
    return res.status(400).send({ status: 'User not created', })
  }
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.send({ error: true, status: 'Email is requird', })
    }
    if (!password) {
      return res.send({ error: true, status: 'password is requird', })
    }
    let alredyuser = await User.findOne({ email: email })

    if (!alredyuser) {
      return res.send({ error: true, status: 'Email not found, Regestre first', })

    }

    if (email && password) {
      let checkpass = await bcrypt.compare(password, alredyuser.password)
      if (!checkpass) {
        return res.send({ error: true, status: 'password Dost match', })
      }
      try {
        let token = generatetoken(alredyuser._id)
        res.cookie("token", token)
        if (token) {
          return res.status(201).send({ error: false, status: 'User Login succees', token: token, alredyuser: alredyuser })
        }
      } catch (error) {
        return res.status(201).send({ error: true, status: 'Unable to login' })
      }
    }
  } catch (error) {
    return res.status(400).send({ status: 'Login issue ', error: error })
  }
})
app.put('/edit', async (req, res) => {
  const { id, email, password, confpassword } = req.body;
  try {
    if (!email) {
      return res.send({ error: true, status: 'Email is requird', })
    }
    if (!password) {
      return res.send({ error: true, status: 'password is requird', })
    }
    if (password !== confpassword) {
      return res.send({ error: true, status: 'password Dosnt match', })
    }
    if (email && password  && id) {
      let hashpassword = await bcrypt.hash(password, 5)

      await User.findByIdAndUpdate(id, {
        email: email,
        password: hashpassword,
      })
      let updatedval = await User.findOne({ _id: id })
      return res.status(201).send({ status: 'User Edited success', editable: updatedval })
      //save mongo data
    }
  } catch (error) {
    return res.status(400).send({ status: 'Error in Edit', error: error })
  }
})
app.delete('/delete/:idx', async (req, res) => {
  const id = req.params.idx
  try {
    if (!id) {
      return res.status(201).send({ status: 'Id requird ' })
    }
    let chekid = await User.findById(id)
    if (chekid) {
      await User.findByIdAndDelete(id)
      let updatedval = await User.find({})
      return res.status(201).send({ status: 'User Delet success success', alldata: updatedval })
    }
  } catch (error) {
    return res.status(400).send({ status: 'Error in delet', error: error })
  }
})


app.post('/logout', (req, res) => {
  try {
    res.clearCookie(token)
    return res.send({ error: false, status: 'Logout Success', })
  } catch (error) {

    return res.send({ error: true, status: 'Unable to Logout', })


  }
})
app.listen(PORT, () => {
  connetfun()
  console.log("server started")
})