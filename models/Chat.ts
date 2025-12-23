import { DataTypes, Model, Sequelize } from "sequelize";
import { getSequelize } from "@/lib/db";
import { User } from "./User";

export class Chat extends Model {
  declare id: string;
  declare userId: string;
  declare summary: string | null;
  declare memoryConfidence: number | null;
  declare createdDate: Date;
  declare updatedDate: Date;
}

// let initialized = false;

export function initChatModel(sequelize: Sequelize) {
  // if (initialized) return Chat;

  // const sequelize: Sequelize = await getSequelize();

  Chat.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT("long"),
      },
      memoryConfidence: {
        type: DataTypes.FLOAT,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,          // ✅ REAL Sequelize instance
      tableName: "chats",
      timestamps: false,
    }
  );

  // initialized = true;
  return Chat;
}


// /* ------------------------------------------------------------------ */
// /* 4️⃣ Relations                                                      */
// /* ------------------------------------------------------------------ */
// Chat.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(Chat, { foreignKey: "userId" });
