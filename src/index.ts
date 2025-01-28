import { efri } from "../efri";
import { Application } from "efri/core";

await efri.init();

Application.getInstance().serve();
