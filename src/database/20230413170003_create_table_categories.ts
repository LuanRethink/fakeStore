import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    //id, titulo, preço, categoria, imagem
    await knex.schema.createTable("categories", function (table) {
        table.increments();
        table.string("name").notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("categories");
}


