/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("NEWID()"));

    table.string("email", 255).notNullable().unique();

    table.boolean("is_active").notNullable().defaultTo(true);

    table
      .dateTime("created_at", { precision: 7 })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.dateTime("updated_at", { precision: 7 }).nullable();
    table.dateTime("deactivated_at", { precision: 7 }).nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("users");
}
