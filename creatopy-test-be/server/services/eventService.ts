import { EventEmitter } from 'events';
import LoggingService from "./loggingService";

export default class EventService extends EventEmitter {
  logger: LoggingService;
  constructor(logger: LoggingService) {
    super();
    this.logger = logger;
  }
};
