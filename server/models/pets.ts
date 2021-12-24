import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Pet extends Model {}
Pet.init(
  {
    petName: DataTypes.STRING,
    bio: DataTypes.STRING,
    imageDataURL: DataTypes.STRING,
    petLat: DataTypes.FLOAT,
    petLng: DataTypes.FLOAT,
    emailUser: DataTypes.STRING,
  },
  { sequelize, modelName: "Pet" }
);
