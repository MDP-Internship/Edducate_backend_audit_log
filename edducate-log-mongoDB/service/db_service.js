import mongoose from "mongoose"
import UserLog from "../model/UserLog"


export async function mongoAdd(data) {
  try {
    let personLog = new UserLog(data);
 personLog.save()
  } catch (error) {
    throw error
  }

}
