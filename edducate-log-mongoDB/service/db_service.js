import mongoose from "mongoose"
import UserLog from "../model/UserLog"


export async function mongoAdd(data) {

console.log(data);
  try {
    const personLog = new UserLog(data);

    
 personLog.save().then((data)=>{console.log("mongoDB'ye kayıt eklendi");})
  } catch (error) {
    throw error
  }

}
