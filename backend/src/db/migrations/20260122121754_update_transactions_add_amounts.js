export async function up(knex) {
  await knex.schema.alterTable("transactions", (table) => {
    table.decimal("converted_amount", 14, 2).notNullable();
  });
}

export async function down(knex) {
  await knex.schema.alterTable("transactions", (table) => {
    table.dropColumn("converted_amount");
  });
}
