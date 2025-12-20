import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";
import { User } from "./User";

export class Chat extends Model {}

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

Chat.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Chat, { foreignKey: "userId" });
