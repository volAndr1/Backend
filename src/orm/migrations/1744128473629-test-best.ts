import {MigrationInterface, QueryRunner} from "typeorm";

export class testBest1744128473629 implements MigrationInterface {
    name = 'testBest1744128473629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "test" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "test"
        `);
    }

}
