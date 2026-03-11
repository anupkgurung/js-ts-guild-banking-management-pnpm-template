import Bank from "@/models/bank";
import User from "@/models/user";
import { BankAccountId, UserId } from "@/types/Common";

export default class GlobalRegistry {
  static bankMap = new Map<string, Bank>();
  static usersMap = new Map<UserId, User>();

  static registerBank(bank: Bank) {
    this.bankMap.set(bank.getId(), bank);
  }

  static registerUser(userDetails: User) {
    this.usersMap.set(userDetails.getId(), userDetails);
  }

  static getBank(id: BankAccountId) {
    return this.bankMap.get(id);
  }

  static getUser(id: UserId) {
    return this.usersMap.get(id);
  }

  static clear() {
    this.bankMap.clear();
    this.usersMap.clear();
  }
}
