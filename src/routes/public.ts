import { Router } from "efri/core/router/Router";
import { PublicRouteController } from "efri/core/controllers/PublicRouteController";

const router = Router.getInstance();

router.get("/public/{file}", [PublicRouteController, "handle"]);
