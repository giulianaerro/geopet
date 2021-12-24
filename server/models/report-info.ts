import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Report extends Model {}
Report.init(
  {
    petName: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    petInfo: DataTypes.STRING,
  },
  { sequelize, modelName: "Report" }
);
