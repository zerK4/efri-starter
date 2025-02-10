import { Efri } from "efri/core";

async function bootstrap() {
  const app = Efri.getInstance();

  await app.serve();
}

bootstrap();
