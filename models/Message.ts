import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { getSequelize } from "@/lib/db";
import { Chat } from "./Chat";

/* ------------------------------------------------------------------ */
/* 1️⃣ Type definitions                                               */
/* ------------------------------------------------------------------ */
interface MessageAttributes {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface MessageCreationAttributes
  extends Optional<MessageAttributes, "id" | "createdDate" | "updatedDate"> {}

/* ------------------------------------------------------------------ */
/* 2️⃣ Typed Model                                                    */
/* ------------------------------------------------------------------ */
export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  declare id: string;
  declare chatId: string;
  declare role: "user" | "assistant";
  declare content: string;
  declare createdDate: Date;
  declare updatedDate: Date;
}

// let initialized = false;

/* ------------------------------------------------------------------ */
/* 3️⃣ Async init (CRITICAL FIX)                                      */
/* ------------------------------------------------------------------ */
export function initMessageModel(sequelize: Sequelize) {
  // if (initialized) return Message;

  // const sequelize: Sequelize = await getSequelize();

  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      chatId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
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
      sequelize,
      tableName: "messages",
      timestamps: false,
    }
  );

  // initialized = true;
  return Message;
}


// /* ------------------------------------------------------------------ */
// /* 4️⃣ Associations                                                   */
// /* ------------------------------------------------------------------ */
// Message.belongsTo(Chat, { foreignKey: "chatId" });
// Chat.hasMany(Message, { foreignKey: "chatId" });
