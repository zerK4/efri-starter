import { UserController } from "../controllers/UserController";
import { Router } from "efri/core/router/Router";

const router = Router.getInstance();

router.group({ prefix: "/api", middleware: ["logger"] }, () => {
  router.group({ prefix: "/users" }, () => {
    router.get(
      "/",
      [UserController, "index"],
      [
        //your middlewares, 'auth', 'smth'
      ]
    );

    router.get("/{user}", [UserController, "show"]);
    router.post("/create", [UserController, "create"]);
  });
});

router.get(
  "/",
  async ({ res, req, query }) => {
    return res.json({
      "m": "Hello World!",
    });
  },
  ["cors", "rateLimiter"]
);
