import {OpenAccountCommand} from "./open-account.command";
import {CloseAccountCommand} from "./close-account.command";
import {GetAccountsQuery} from "./get-accounts.query";
import {Account} from "./create.account";

export interface AccountManager {
  openAccount(command: OpenAccountCommand): Promise<Account>
  closeAccount(command: CloseAccountCommand): Promise<Account>
  getAccounts(query: GetAccountsQuery): Promise<Account[]>
}
