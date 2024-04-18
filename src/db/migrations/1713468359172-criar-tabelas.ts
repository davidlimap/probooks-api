import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelas1713468359172 implements MigrationInterface {
    name = 'CriarTabelas1713468359172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(200) NOT NULL, "email" character varying(100) NOT NULL, "biografia" character varying(500) NOT NULL, "dataCadastro" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8973029e8bb26f72a4738afc834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "livros" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying(100) NOT NULL, "resumo" character varying(500) NOT NULL, "sumario" character varying(100) NOT NULL, "preco" integer NOT NULL, "num_paginas" integer NOT NULL, "ISBN" character varying(100) NOT NULL, "dataPublicacao" date NOT NULL, "quantidade_disponivel" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "autorId" uuid, "categoriaId" uuid, CONSTRAINT "PK_69daba516e6b0dd45f49c4d8d52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "itens_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedidoId" uuid, "livroId" uuid, CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor_total" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuarioId" uuid, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(200) NOT NULL, "email" character varying(100) NOT NULL, "email2" character varying(100) NOT NULL, "cpf" character varying(14) NOT NULL, "telefone" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rua" character varying(400) NOT NULL, "numero" character varying(30) NOT NULL, "complemento" character varying(50) NOT NULL, "bairro" character varying(100) NOT NULL, "cidade" character varying(100) NOT NULL, "estado" character varying(100) NOT NULL, "cep" character varying(8) NOT NULL, "usuarioId" uuid, CONSTRAINT "PK_ee44db7ad1269586580c408f2b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "livros" ADD CONSTRAINT "FK_8eca18d09617a51975c15e7ac28" FOREIGN KEY ("autorId") REFERENCES "autores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livros" ADD CONSTRAINT "FK_3cc6f4997fd3243e6f3212262b5" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_eae91a5dbe308330179a2777a1d" FOREIGN KEY ("livroId") REFERENCES "livros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_enderecos" ADD CONSTRAINT "FK_f352da9060e49ff18be1be91e07" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_enderecos" DROP CONSTRAINT "FK_f352da9060e49ff18be1be91e07"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_eae91a5dbe308330179a2777a1d"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2"`);
        await queryRunner.query(`ALTER TABLE "livros" DROP CONSTRAINT "FK_3cc6f4997fd3243e6f3212262b5"`);
        await queryRunner.query(`ALTER TABLE "livros" DROP CONSTRAINT "FK_8eca18d09617a51975c15e7ac28"`);
        await queryRunner.query(`DROP TABLE "usuario_enderecos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "itens_pedidos"`);
        await queryRunner.query(`DROP TABLE "livros"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "autores"`);
    }

}
