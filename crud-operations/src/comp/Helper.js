export const passwordslicer=(a)=>{
  let x=a.split('')
  let y='';
  for (let i = 0; i < Math.min(x.length, 10); i++) {
    y += x[i];
  }
  // console.log(y)
  return y
}



export const timesplit=(a)=>{
  let x=a.split('T')
  let m=x[1].split('.')
  let y=" Date: "+x[0]+" Time: "+m[0];
  
  // console.log(y)
  return y
}