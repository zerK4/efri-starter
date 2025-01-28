import { Model } from "efri/core/models/Model";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class User extends Model<IUser> {
  protected static primaryKey: string = "id";
  public table?: string | undefined = "users";
}
