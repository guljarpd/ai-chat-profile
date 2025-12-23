import { getSequelize } from "@/lib/db";
import { initUserModel } from "./User";
import { initChatModel } from "./Chat";
import { initMessageModel } from "./Message";

let initialized = false;

export async function initDB() {
  if (initialized) return;

  const sequelize = await getSequelize();

  /* -------------------------------------------------- */
  /* 1️⃣ Initialize models (REGISTER ONLY)              */
  /* -------------------------------------------------- */
  const User = initUserModel(sequelize);
  const Chat = initChatModel(sequelize);
  const Message = initMessageModel(sequelize);

  /* -------------------------------------------------- */
  /* 2️⃣ Define relations                               */
  /* -------------------------------------------------- */
  User.hasMany(Chat, { foreignKey: "userId" });
  Chat.belongsTo(User, { foreignKey: "userId" });

  Chat.hasMany(Message, { foreignKey: "chatId" });
  Message.belongsTo(Chat, { foreignKey: "chatId" });

  /* -------------------------------------------------- */
  /* 3️⃣ Connect + sync                                 */
  /* -------------------------------------------------- */
  await sequelize.authenticate();

  // IMPORTANT: sync registers metadata & locks dialect
  await sequelize.sync();

  initialized = true;

  console.log("✅ DB initialized");
}
