import jwt from 'jsonwebtoken'
const generatetoken=(id)=>{
  let token = jwt.sign({id},process.env.JWT_SEC,{expiresIn:"7d"})
  // console.log(process.env.JWT_SEC)
  return token
}

export default generatetoken