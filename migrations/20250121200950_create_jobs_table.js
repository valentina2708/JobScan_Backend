/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('jobs', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('company').notNullable();
        table.string('location').notNullable();
        table.text('description').notNullable();
        table.string('link').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('jobs');
};
