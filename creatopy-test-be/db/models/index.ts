import { Sequelize } from "sequelize";
import config from "../config";

const env: string = process.env.NODE_ENV || "development";

const targetConfig: any = config[env];

const sequelize: Sequelize = targetConfig.url
  ? new Sequelize(targetConfig.url, targetConfig)
  : new Sequelize(targetConfig.database, targetConfig.username, targetConfig.password, targetConfig);


export { Sequelize, sequelize };