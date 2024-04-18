import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveEmail21713474851537 implements MigrationInterface {
    name = 'RemoveEmail21713474851537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "email2" character varying(100) NOT NULL`);
    }

}
