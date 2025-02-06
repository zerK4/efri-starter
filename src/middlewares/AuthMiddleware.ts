import { middlewareStack } from "efri/core/middlewares";

export default middlewareStack.register("auth", {
  async handle(req: Request, next: () => Promise<Response>): Promise<Response> {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Here you would validate the token
    const token = authHeader.split(" ")[1];
    if (token !== "valid-token") {
      // This is just an example validation
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return next();
  },
});
