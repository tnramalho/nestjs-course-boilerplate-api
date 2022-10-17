import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTables1664757497775 implements MigrationInterface {
  name = 'initTables1664757497775';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" citext NOT NULL, "password" text NOT NULL, "salt" text, "firstName" citext, "lastName" citext, "email" citext NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "UQ_7b4e17a669299579dfa55a3fc35" UNIQUE ("userId", "roleId"), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`
    );
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
