import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize, sequelize } from ".";

interface ItemAttributes {
  id: string;
  title: string;
  userId: string;
}

export interface ItemCreationAttributes
  extends Optional<ItemAttributes, "id"> { }

export interface ItemInstance
  extends Model<ItemAttributes, ItemCreationAttributes>,
  ItemAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Item = sequelize.define<ItemInstance>(
  "Item",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    title: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: true,
      type: DataTypes.UUID,
    },
  }
);

export default Item;