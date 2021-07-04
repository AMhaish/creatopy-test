import Item from "../../db/models/item";
import User from "../../db/models/user";
import LoggingService from "../services/loggingService";

const dbConf: any = {
    async sync(logger: LoggingService): Promise<void> {
        await User.sync({
            logging: (message) => {
                logger.logInfo(message, "db Config");
            },
        });
        await Item.sync({
            logging: (message) => {
                logger.logInfo(message, "db Config");
            },
        });
    }
};

export default dbConf;