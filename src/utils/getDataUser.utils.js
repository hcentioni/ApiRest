import jwt from 'jsonwebtoken';
import app from '../app'

export function getUser(bearerToken) {
  console.log(bearerToken)
  return 1
  if (typeof bearerToken !== 'undefined' ){
    let token = bearerToken.split(".")[1];
    let decoded = jwt.decode(token, app.get('secret'), true);
    console.log(decoded);
    return  decoded
  }else{
      return undefined
  }
  }
  

