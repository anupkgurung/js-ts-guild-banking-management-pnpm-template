import { BankAccountId } from "@/types/Common";
import { v4 as uuidv4 } from "uuid";

export default class BankAccount {
  id: BankAccountId = uuidv4();

  accountBalance: number = 500;
  allowsNegativeBalance: boolean = false;
  getId() {
    return this.id;
  }
  getBalance() {
    return this.accountBalance;
  }
}
