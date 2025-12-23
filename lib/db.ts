import type { Sequelize as SequelizeType } from "sequelize";

let sequelize: SequelizeType | null = null;

export async function getSequelize() {
  if (sequelize) return sequelize;

  const { Sequelize } = await import("sequelize");

  sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      dialect: "mysql",
      logging: false,
    }
  );

  sequelize.addHook("beforeUpdate", (instance: any) => {
    instance.updatedDate = new Date();
  });

  return sequelize;
}
