import { User, type IUser } from "../models/User";
import { Controller } from "efri/core/controllers/Controller";
import type { RouterContext } from "efri/core/types/router";
import { UserCanRead } from "../gates/canRead";
import { z } from "zod";
import type { IResponseHelper } from "efri/core/types/plugin";

export class UserController extends Controller {
  public async index({
    res,
    req,
    params,
    query,
  }: RouterContext<{
    res: IResponseHelper;
  }>): Promise<Response> {
    const users = await User.get();
    return res.json({ users });
  }

  // @Authorized("user.read")
  async show({ res, params }: RouterContext): Promise<Response> {
    return await UserCanRead(
      async () => {
        try {
          const user = await User.find(params.user).first();
          return res.json({ user: user });
        } catch (error) {
          console.log(error);
          return res.json({ error: "Internal Server Error" }, 500);
        }
      },
      "user.read",
      res
    );
  }

  public async create({ res, req }: RouterContext) {
    try {
      const data: IUser = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };

      const user = await User.create(data);
      return res.json({ user });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
}
