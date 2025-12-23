import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { getSequelize } from "@/lib/db";

/* ------------------------------------------------------------------ */
/* 1️⃣ Type definitions                                               */
/* ------------------------------------------------------------------ */
interface UserAttributes {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  timezone?: string;

  passwordHash: string;
  isActive?: boolean;
  lastLoginAt?: Date;

  createdDate?: Date;
  updatedDate?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "lastName"
    | "avatarUrl"
    | "timezone"
    | "lastLoginAt"
    | "createdDate"
    | "updatedDate"
    | "isActive"
  > {}

/* ------------------------------------------------------------------ */
/* 2️⃣ Typed Model                                                    */
/* ------------------------------------------------------------------ */
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string;
  declare email: string;
  declare firstName: string;
  declare lastName?: string;
  declare avatarUrl?: string;
  declare timezone?: string;

  declare passwordHash: string;
  declare isActive: boolean;
  declare lastLoginAt?: Date;

  declare createdDate: Date;
  declare updatedDate: Date;
}

// let initialized = false;

/* ------------------------------------------------------------------ */
/* 3️⃣ Async init (CRITICAL FIX)                                      */
/* ------------------------------------------------------------------ */
export function initUserModel(sequelize: Sequelize) {
  // if (initialized) return User;

  // const sequelize: Sequelize = await getSequelize();

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
      timestamps: false,
    }
  );

  // initialized = true;
  return User;
}
