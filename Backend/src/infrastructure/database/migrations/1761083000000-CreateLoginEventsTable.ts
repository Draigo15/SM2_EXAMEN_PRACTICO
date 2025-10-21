import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoginEventsTable1761083000000 implements MigrationInterface {
  name = 'CreateLoginEventsTable1761083000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "login_events" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "device_info" character varying(255),
        "ip_hash" character varying(128),
        "user_agent" character varying(255),
        "success" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_login_events_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_login_events_user_id" ON "login_events" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_login_events_created_at" ON "login_events" ("created_at") `,
    );
    await queryRunner.query(
      `ALTER TABLE "login_events" ADD CONSTRAINT "FK_login_events_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_events" DROP CONSTRAINT "FK_login_events_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_login_events_created_at"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_login_events_user_id"`);
    await queryRunner.query(`DROP TABLE "login_events"`);
  }
}