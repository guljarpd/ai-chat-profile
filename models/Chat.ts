import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/lib/db";
import { User } from "./User";

/* ------------------------------------------------------------------ */
/* 1️⃣ Types                                                          */
/* ------------------------------------------------------------------ */
interface ChatAttributes {
  id: string;
  userId: string;
  summary?: string | null;
  memoryConfidence?: number | null;
  createdDate?: Date;
  updatedDate?: Date;
}

interface ChatCreationAttributes
  extends Optional<
    ChatAttributes,
    "id" | "summary" | "memoryConfidence" | "createdDate" | "updatedDate"
  > {}

/* ------------------------------------------------------------------ */
/* 2️⃣ Model                                                          */
/* ------------------------------------------------------------------ */
export class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  declare id: string;
  declare userId: string;
  declare summary: string | null;
  declare memoryConfidence: number | null;
  declare createdDate: Date;
  declare updatedDate: Date;
}

/* ------------------------------------------------------------------ */
/* 3️⃣ Init (DB schema stays compatible)                               */
/* ------------------------------------------------------------------ */
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
      defaultValue: 0,
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
    tableName: "chats",
    timestamps: false,
  }
);

/* ------------------------------------------------------------------ */
/* 4️⃣ Relations                                                      */
/* ------------------------------------------------------------------ */
Chat.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Chat, { foreignKey: "userId" });
