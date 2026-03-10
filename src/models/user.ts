import { UserId } from "@/types/Common";
import { v4 as uuidv4 } from "uuid";
export default class User {
  userId: UserId;
  userName: string;
  userAccount: string[];

  constructor(userFullname: string, userAccountId: string[]) {
    this.userId = uuidv4();
    this.userName = userFullname;
    this.userAccount = userAccountId;
  }

  getId() {
    return this.userId;
  }

  static create(userFullname: string, userAccountId: string[]) {
    return new User(userFullname, userAccountId);
  }
}
