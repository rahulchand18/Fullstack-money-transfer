/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing users
  await knex("users").del();

  // Insert admin user
  await knex("users").insert([
    {
      email: "chandrahul442@gmail.com",
      full_name: "Rahul Chand",
      is_active: true,
    },
  ]);
}
