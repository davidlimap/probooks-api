import { MigrationInterface, QueryRunner } from "typeorm";

export class InserirSenhaUsuario1713879082652 implements MigrationInterface {
    name = 'InserirSenhaUsuario1713879082652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "senha" character varying(256) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "senha"`);
    }

}
