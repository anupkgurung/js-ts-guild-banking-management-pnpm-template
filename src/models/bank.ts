import BankAccount from "./bank-account";
import { v4 as uuidv4 } from "uuid";
import { BankAccountId } from "@/types/Common";
import GlobalRegistry from "@/services/GlobalRegistry";

export default class Bank {
  canHaveNegativeBalance: boolean = false;
  bankId: string;
  accountList = new Map<BankAccountId, BankAccount>();

  constructor(options?: { isNegativeAllowed?: boolean }) {
    this.bankId = uuidv4();
    this.canHaveNegativeBalance = options?.isNegativeAllowed ?? false;
    GlobalRegistry.
  }

  createAccount(accountBalance: number) {
    const bankAccount = new BankAccount();

    bankAccount.allowsNegativeBalance = this.canHaveNegativeBalance;
    bankAccount.accountBalance = accountBalance;

    this.accountList.set(this.bankId, bankAccount);

    return bankAccount;
  }

  getId() {
    return this.bankId;
  }

  send(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    accountId?: number,
  ) {}

  getAccount(accountId: string) {}

  static create(options?: { isNegativeAllowed?: boolean }) {
    const bankObj = new Bank(options);
    // bankObj.bankId = uuidv4();
    // bankObj.canHaveNegativeBalance = options?.isNegativeAllowed ?? false;
    return bankObj;
  }
}
