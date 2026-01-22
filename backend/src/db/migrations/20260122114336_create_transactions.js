export async function up(knex) {
  await knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary();

    table.uuid("sender_id").notNullable().references("id").inTable("parties");

    table.uuid("receiver_id").notNullable().references("id").inTable("parties");

    table.decimal("amount", 14, 2).notNullable();
    table.string("currency", 3).notNullable();
    table.decimal("exchange_rate", 10, 4).notNullable();

    table.decimal("fee", 14, 2).defaultTo(0);
    table.decimal("total_payable", 14, 2).notNullable();

    table
      .enu("status", ["PENDING", "COMPLETED", "FAILED"])
      .defaultTo("PENDING");

    table.string("remarks");

    table.timestamp("created_at");
    table.timestamp("updated_at");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("transactions");
}
