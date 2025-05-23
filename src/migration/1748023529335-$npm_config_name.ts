import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1748023529335 implements MigrationInterface {
    name = ' $npmConfigName1748023529335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "passw"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "passw" TO "password"`);
    }

}
