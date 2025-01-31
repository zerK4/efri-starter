import { User, type IUser } from "../models/User";
import { Controller } from "efri/core/controllers/Controller";
import type { RouterContext } from "efri/core/types/router";

export class UserController extends Controller {
  public async index({
    res,
    req,
    params,
    query,
  }: RouterContext): Promise<Response> {
    const users = await User.get();
    return res.json(users);
  }

  public async show({ res, params }: RouterContext): Promise<Response> {
    try {
      const user = await User.find(params.user).first();

      return res.json({ user: user });
    } catch (error) {
      console.log(error);

      return res.json({ error: "Internal Server Error" }, 500);
    }
  }

  public async create({ res }: RouterContext) {
    try {
      const data: IUser = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };

      const user = await User.create(data);
      return res.json({ user });
    } catch (error) {
      console.log(error);
      return res.json({ error: "Internal Server Error" }, 500);
    }
  }
}
