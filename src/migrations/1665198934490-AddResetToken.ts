import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetToken1665198934490 implements MigrationInterface {
  name = 'AddResetToken1665198934490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "resetToken" uuid`);
    await queryRunner.query(`ALTER TABLE "user" ADD "resetTokenExp" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetTokenExp"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetToken"`);
  }
}
