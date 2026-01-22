export async function up(knex) {
  await knex.schema.createTable("parties", (table) => {
    table.uuid("id").primary();

    table.enu("type", ["SENDER", "RECEIVER"]).notNullable();

    table.string("country_code", 2).notNullable();

    table.string("full_name").notNullable();
    table.string("email");
    table.string("phone");
    table.string("address");

    table.boolean("is_active").notNullable().defaultTo(true);

    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.timestamp("deactivated_at");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("parties");
}
