import Bank from "@/models/bank";

import User from "@/models/user";
import { , UserId } from "@/types/Common";

export default class GlobalRegistry {
  
 bankMap = new Map<string, Bank>();
  usersMap = new Map<UserId, User>();

  static registerBank(){
this.bankMap
  }

  static registerUser(){

  }

  static clear() {}
}
