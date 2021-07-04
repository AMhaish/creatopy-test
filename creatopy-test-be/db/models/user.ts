const bcrypt = require("bcrypt-nodejs");
import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from ".";
import Item from "./item";

interface UserAttributes {
    id: string;
    email: string;
    password: string;
    resetPassToken: string;
    resetPassExpires?: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>("User",
    {
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.UUID,
            unique: true,
        },
        email: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        password: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        resetPassToken: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        resetPassExpires: {
            allowNull: true,
            type: DataTypes.BIGINT,
        }
    },
    {
        hooks: {
            beforeCreate(user: UserInstance): any {
                return cryptPassword(user.password)
                    .then((success: string) => (user.password = success))
                    .catch((err) => err && console.error(err));
            },
        }
    }
);

User.hasMany(Item, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "items"
});
Item.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

export function cryptPassword(password: string): Promise<string> {
    return new Promise(function (resolve: any, reject: any): void {
        bcrypt.genSalt(10, function (err: any, salt: any): void {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, null, function (err: any, hash: any): void {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
}

export default User;