import { UserController } from "../controllers/UserController";
import { Router } from "efri/core/router";

const router = Router.getInstance();

router.group({ prefix: "/api", middleware: ["logger"] }, () => {
  router.group({ prefix: "/users" }, () => {
    router.get("/", [UserController, "index"]);
    router.get("/{user}", [UserController, "show"]);
    router.post("/create", [UserController, "create"]);
  });
});
