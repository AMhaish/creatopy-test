import winston from "winston";
import moment from "moment";
const { combine, timestamp, printf } = winston.format;

const { LOGS } = process.env;
var transports: any;
if (LOGS === "JSON") {
  transports = [new winston.transports.Console()];
} else {
  transports = [
    new winston.transports.Console({
      format: combine(
        timestamp(),
        printf((options) => {
          let level: string = options.level.toUpperCase();
          return `${moment().toISOString()} ${level} [creatopy,${options.TraceId},
            ${options.SpanId},${options.Exportable}] ${process.pid} --- [nodeThread] --- ${options.ClassName} : ${options.message}`;
        })
      ),
    }),
  ];
}

export const logger : winston.Logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "creatopy" },
  transports: transports,
});

export default logger;