import { sequelize } from "@/lib/db";
import "./User";
import "./Chat";
import "./Message";

export const initDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};
