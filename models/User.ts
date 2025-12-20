import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";

export class User extends Model {
  declare id: string;
  declare email: string;
  declare firstName: string;
  declare lastName?: string;
  declare avatarUrl?: string;
  declare timezone?: string;

  // auth-related
  declare passwordHash: string;
  declare isActive: boolean;
  declare lastLoginAt?: Date;

  declare createdDate: Date;
  declare updatedDate: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    avatarUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    timezone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    /* =========================
       AUTH FIELDS (NEW)
    ========================== */

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    /* =========================
       TIMESTAMPS (EXISTING)
    ========================== */

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
    tableName: "users",
    timestamps: false, // keep your existing design
  }
);
