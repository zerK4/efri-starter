import { gate } from "efri/core/gates/CoreGate";
import type { ResponseHelper } from "efri/core/helpers/ResponseHelper";
import type { User } from "efri/core/types/model";

gate.define("user.read", async (user: User | null) => {
  return user?.id === 1;
});

export const UserCanRead = async (
  cb: () => Promise<Response>,
  check: string,
  res: ResponseHelper
): Promise<Response> => {
  if (await gate.allows(check)) {
    return cb();
  } else {
    return res.json({ error: "Unauthorized" }, 403);
  }
};

gate.middleware("user.read");
