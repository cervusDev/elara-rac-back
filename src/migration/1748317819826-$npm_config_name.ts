import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1748317819826 implements MigrationInterface {
    name = ' $npmConfigName1748317819826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "participants" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "participants"`);
    }

}
