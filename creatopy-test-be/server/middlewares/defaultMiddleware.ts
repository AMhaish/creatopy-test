import { Application, raw } from "express";
import Constants from "../utils/constants";
const bodyParser = require("body-parser");
const cors = require("cors");

export default class DefaultMiddleware {

  initialize(app: Application): void {
    app.use(bodyParser.json({ limit: Constants.UploadLimit }));
    app.use(bodyParser.urlencoded({ extended: true, limit: Constants.UploadLimit }));
    app.use(raw({ type: "*/*", limit: Constants.UploadLimit }) as any);
    app.use(cors({ origin: Constants.AllowedOrigins, credentials: true }));
  }
}
