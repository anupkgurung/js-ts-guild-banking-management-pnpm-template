import BankAccount from "./bank-account";
import { v4 as uuidv4 } from "uuid";
import { BankAccountId } from "@/types/Common";
import GlobalRegistry from "@/services/GlobalRegistry";
import User from "./user";

export default class Bank {
  canHaveNegativeBalance: boolean = false;
  id: string;
  accountMap = new Map<BankAccountId, BankAccount>();

  constructor(options?: { isNegativeAllowed?: boolean }) {
    this.id = uuidv4();
    this.canHaveNegativeBalance = options?.isNegativeAllowed ?? false;
  }

  createAccount(accountBalance: number) {
    const bankAccount = new BankAccount();

    bankAccount.allowsNegativeBalance = this.canHaveNegativeBalance;
    bankAccount.accountBalance = accountBalance;

    this.accountMap.set(bankAccount.getId(), bankAccount);

    return bankAccount;
  }

  getId() {
    return this.id;
  }

  send(fromUserId: string, toUserId: string, amount: number, bankId?: string) {
    let fromUser: User = GlobalRegistry.getUser(fromUserId);
    let toUser: User = GlobalRegistry.getUser(toUserId);

    let senderAccountId = fromUser?.userAccount.find((o) => {
      let account: BankAccount = this.getAccount(o);
      if (account && account.getBalance() >= amount) {
        return o;
      }
    });
    let senderAccount: BankAccount = this.getAccount(senderAccountId);

    if (!senderAccountId && !this.canHaveNegativeBalance) {
      throw new Error("Insufficient funds");
    }

    if (this.canHaveNegativeBalance) {
      if (!senderAccountId) {
        senderAccountId = fromUser?.userAccount.find((o) => this.getAccount(o));
      }
      senderAccount = this.getAccount(senderAccountId);
    }

    let receiverAccountId = toUser?.userAccount[0];
    let receiverAccount: BankAccount;
    if (bankId) {
      receiverAccount =
        GlobalRegistry.getBank(bankId).getAccount(receiverAccountId);
    } else {
      receiverAccount = this.getAccount(receiverAccountId);
    }

    this.deductFromSenderAccount(senderAccount, amount);
    this.addToReceiverAccount(receiverAccount, amount);
  }

  getAccount(accountId: string) {
    return this.accountMap.get(accountId);
  }

  deductFromSenderAccount(accountDetails: BankAccount, amount: number) {
    const oldBalance = accountDetails.getBalance();
    const newBalance = oldBalance - amount;
    accountDetails.accountBalance = newBalance;
  }

  addToReceiverAccount(accountDetails: BankAccount, amount: number) {
    const oldBalance = accountDetails.getBalance();
    const newBalance = oldBalance + amount;
    accountDetails.accountBalance = newBalance;
  }

  static create(options?: { isNegativeAllowed?: boolean }) {
    const bankObj = new Bank(options);
    GlobalRegistry.registerBank(bankObj);
    return bankObj;
  }
}
