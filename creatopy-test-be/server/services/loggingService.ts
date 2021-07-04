import { logger } from "../core/logger";

export default class LoggingService {
  constructor() { }
  traceId: string | undefined;
  spanId: string | undefined;

  setTraceId(traceId: string) {
    this.traceId = traceId;
  }

  setSpanId(spanId: string) {
    this.spanId = spanId;
  }

  getTraceId() {
    return this.traceId;
  }

  logInfo(message: string, className: string) {
    logger.log("info", message, { TraceId: this.traceId, SpanId: this.spanId, Exportable: "export-span", ClassName: className });
  }

  logError(message: string, className: string) {
    logger.log("error", message, { TraceId: this.traceId, SpanId: this.spanId, Exportable: "export-span", ClassName: className });
  }

  logWarning(message: string, className: string) {
    logger.log("warn", message, { TraceId: this.traceId, SpanId: this.spanId, Exportable: "export-span", ClassName: className });
  }

  logFatal(message: string, className: string) {
    logger.log("fatal", message, { TraceId: this.traceId, SpanId: this.spanId, Exportable: "export-span", ClassName: className });
  }

  logDebug(message: string, className: string) {
    logger.log("debug", message, { TraceId: this.traceId, SpanId: this.spanId, Exportable: "export-span", ClassName: className });
  }
};
