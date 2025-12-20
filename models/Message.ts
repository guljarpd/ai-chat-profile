import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/lib/db";
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
  extends Optional<
    MessageAttributes,
    "id" | "createdDate" | "updatedDate"
  > {}

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

/* ------------------------------------------------------------------ */
/* 3️⃣ Sequelize init (unchanged DB schema)                           */
/* ------------------------------------------------------------------ */
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
      type: DataTypes.STRING(20), // keeping your original schema
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

/* ------------------------------------------------------------------ */
/* 4️⃣ Associations                                                   */
/* ------------------------------------------------------------------ */
Message.belongsTo(Chat, { foreignKey: "chatId" });
Chat.hasMany(Message, { foreignKey: "chatId" });
