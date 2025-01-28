import { Migration } from "efri/core/database/Migration";

export class CreateUsersTable extends Migration {
  async up(): Promise<void> {
    await this.schema.create("users", (table) => {
      table.increments("id");
      table.string("name");
      table.string("email");
      table.string("password");
      table.timestamps(true, true);
    });
  }

  async down(): Promise<void> {
    await this.schema.dropIfExists("users");
  }
}
