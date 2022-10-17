import { MigrationInterface, QueryRunner } from 'typeorm';

export class Federated1665882607149 implements MigrationInterface {
  name = 'Federated1665882607149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "federated" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "provider" character varying NOT NULL, "providerRef" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6037a20d155c89a0dec47ead84e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "federated" ADD CONSTRAINT "FK_216af9ffcc64c2529a9db18b52c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "federated" DROP CONSTRAINT "FK_216af9ffcc64c2529a9db18b52c"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`
    );
    await queryRunner.query(`DROP TABLE "federated"`);
  }
}
