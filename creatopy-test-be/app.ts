// tslint:disable-next-line: comment-format
require("dotenv").config(); // For loading environment variables from .env file in development mode
import server from "./server/core/server"; // server.js includes the creation of Apolo and Express servers

const { PORT } = process.env;
server.start(PORT);

