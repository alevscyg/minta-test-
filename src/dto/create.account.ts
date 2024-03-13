export class Account {
    public id: string;
    public email: string;
    public name: string;
    public number: string;
    public status: AccountStatus;
  }
  
export type AccountStatus = "Open" | "Close";