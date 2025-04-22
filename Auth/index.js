import express from 'express'
import { connetfun, User } from './db/db.js';
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8000;
app.get('/', (req, res) => {
  res.status(200).send({ staus: "WELCOME TO X PAGE" })
})
app.get('/alldata', async (req, res) => {
  try {
    let alldata = await User.find({})
    res.status(200).send({ message: "Get all data", data: alldata })
  } catch (error) {
    res.status(400).send({ message: 'Error while getting data' })
  }
})
app.post('/regester', async (req, res) => {
  const { email, password, confpassword } = req.body;
  try {
    if (!email) {
      res.send({ error: true, status: 'Email is requird', })
      return
    }
    if (!password) {
      res.send({ error: true, status: 'password is requird', })
      return
    }
    if (!(password == confpassword)) {
      res.send({ error: true, status: 'password Dosnt match', })
      return
    }
    if (email && password && confpassword) {
      const createduser = await User.create({
        email: email,
        password: password,
        confpassword: confpassword,
      })
      res.status(201).send({ message: 'User created', newuser: createduser })
      //save mongo data
    }
  } catch (error) {
    console.log(error, "Error in data")
    res.status(400).send({ message: 'User not created', })
  }
})




app.put('/edit', async (req, res) => {
  const { id, email, password, confpassword } = req.body;
  try {
    if (!email) {
      res.send({ error: true, status: 'Email is requird', })
      return
    }
    if (!password) {
      res.send({ error: true, status: 'password is requird', })
      return
    }
    if (!(password == confpassword)) {
      res.send({ error: true, status: 'password Dosnt match', })
      return
    }
    if (email && password && confpassword && id) {
      await User.findByIdAndUpdate(id, {
        email: email,
        password: password,
        confpassword: confpassword
      })
      let updatedval = await User.findOne({ _id: id })

      res.status(201).send({ message: 'User Edited success', editable: updatedval })
      //save mongo data
    }
  } catch (error) {
    res.status(400).send({ message: 'Error in Edit', error: error })
  }
})



app.delete('/delete/:idx', async (req, res) => {
  const  id  = req.params.idx
  try {
    if (!id) {
      res.status(201).send({ message: 'Id requird ' })
      return

    }
    let chekid = await User.findById(id)
    if (chekid) {
      await User.findByIdAndDelete(id)
      let updatedval = await User.find({})
      res.status(201).send({ message: 'User Delet success success', alldata: updatedval })
    }
  } catch (error) {
    res.status(400).send({ message: 'Error in delet', error: error })
  }
})



app.listen(PORT, () => {
  connetfun()
  console.log("server started")
})