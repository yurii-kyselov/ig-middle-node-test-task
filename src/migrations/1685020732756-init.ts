import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1685020732756 implements MigrationInterface {
    name = 'Init1685020732756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "bossId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f92b3d839b53b5c4ff75bec5945" FOREIGN KEY ("bossId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f92b3d839b53b5c4ff75bec5945"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
