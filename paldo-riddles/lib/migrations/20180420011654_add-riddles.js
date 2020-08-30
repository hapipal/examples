'use strict';

exports.up = async (knex) => {

    await knex.schema.createTable('Riddles', (table) => {

        table.increments('id').primary();
        table.string('slug').notNullable();
        table.string('question').notNullable();
        table.string('answer').notNullable();
    });
};

exports.down = async (knex) => {

    await knex.schema.dropTable('Riddles');
};
