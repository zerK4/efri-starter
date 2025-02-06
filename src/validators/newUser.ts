import { z } from "zod";
import { validator } from "efri/core/validators/CoreValidator";

validator.define(
  "newUser",
  z.object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters long",
    }),
    email: z.string().email(),
    password: z.string().min(6),
  })
);

validator.middleware("newUser");
