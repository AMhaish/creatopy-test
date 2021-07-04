import HttpStatusCode from "../models/objects/httpStatusCode";
import { notifyUser } from "../models/types/auth";
export const POST_OPTIONS: {
  method: "POST";
  body: "" | {};
  headers: {
    "Content-Type": "application/json";
  };
} = {
  method: "POST",
  body: {},
  headers: {
    "Content-Type": "application/json",
  },
};

export function notifyUserToast(
  notifyUserFunc: notifyUser | undefined,
  status: HttpStatusCode | undefined,
  messages: {
    CONTINUE?: { type: string; message: string };
    SWITCHING_PROTOCOLS?: { type: string; message: string };
    PROCESSING?: { type: string; message: string };
    OK?: { type: string; message: string };
    CREATED?: { type: string; message: string };
    ACCEPTED?: { type: string; message: string };
    NON_AUTHORITATIVE_INFORMATION?: { type: string; message: string };
    NO_CONTENT?: { type: string; message: string };
    RESET_CONTENT?: { type: string; message: string };
    PARTIAL_CONTENT?: { type: string; message: string };
    MULTI_STATUS?: { type: string; message: string };
    ALREADY_REPORTED?: { type: string; message: string };
    IM_USED?: { type: string; message: string };
    MULTIPLE_CHOICES?: { type: string; message: string };
    MOVED_PERMANENTLY?: { type: string; message: string };
    FOUND?: { type: string; message: string };
    SEE_OTHER?: { type: string; message: string };
    NOT_MODIFIED?: { type: string; message: string };
    USE_PROXY?: { type: string; message: string };
    SWITCH_PROXY?: { type: string; message: string };
    TEMPORARY_REDIRECT?: { type: string; message: string };
    PERMANENT_REDIRECT?: { type: string; message: string };
    BAD_REQUEST?: { type: string; message: string };
    UNAUTHORIZED?: { type: string; message: string };
    PAYMENT_REQUIRED?: { type: string; message: string };
    FORBIDDEN?: { type: string; message: string };
    NOT_FOUND?: { type: string; message: string };
    METHOD_NOT_ALLOWED?: { type: string; message: string };
    NOT_ACCEPTABLE?: { type: string; message: string };
    PROXY_AUTHENTICATION_REQUIRED?: { type: string; message: string };
    REQUEST_TIMEOUT?: { type: string; message: string };
    CONFLICT?: { type: string; message: string };
    GONE?: { type: string; message: string };
    LENGTH_REQUIRED?: { type: string; message: string };
    PRECONDITION_FAILED?: { type: string; message: string };
    PAYLOAD_TOO_LARGE?: { type: string; message: string };
    URI_TOO_LONG?: { type: string; message: string };
    UNSUPPORTED_MEDIA_TYPE?: { type: string; message: string };
    RANGE_NOT_SATISFIABLE?: { type: string; message: string };
    EXPECTATION_FAILED?: { type: string; message: string };
    I_AM_A_TEAPOT?: { type: string; message: string };
    MISDIRECTED_REQUEST?: { type: string; message: string };
    UNPROCESSABLE_ENTITY?: { type: string; message: string };
    LOCKED?: { type: string; message: string };
    FAILED_DEPENDENCY?: { type: string; message: string };
    UPGRADE_REQUIRED?: { type: string; message: string };
    PRECONDITION_REQUIRED?: { type: string; message: string };
    TOO_MANY_REQUESTS?: { type: string; message: string };
    REQUEST_HEADER_FIELDS_TOO_LARGE?: { type: string; message: string };
    UNAVAILABLE_FOR_LEGAL_REASONS?: { type: string; message: string };
    INTERNAL_SERVER_ERROR?: { type: string; message: string };
    NOT_IMPLEMENTED?: { type: string; message: string };
    BAD_GATEWAY?: { type: string; message: string };
    SERVICE_UNAVAILABLE?: { type: string; message: string };
    GATEWAY_TIMEOUT?: { type: string; message: string };
    HTTP_VERSION_NOT_SUPPORTED?: { type: string; message: string };
    VARIANT_ALSO_NEGOTIATES?: { type: string; message: string };
    INSUFFICIENT_STORAGE?: { type: string; message: string };
    LOOP_DETECTED?: { type: string; message: string };
    NOT_EXTENDED?: { type: string; message: string };
    NETWORK_AUTHENTICATION_REQUIRED?: { type: string; message: string };
  }
) {
  if (status && notifyUserFunc) {
    switch (status) {
      case HttpStatusCode.CONTINUE:
        if (messages.CONTINUE) notifyUserFunc(messages.CONTINUE.type, messages.CONTINUE.message);
        break;
      case HttpStatusCode.SWITCHING_PROTOCOLS:
        if (messages.SWITCHING_PROTOCOLS) notifyUserFunc(messages.SWITCHING_PROTOCOLS.type, messages.SWITCHING_PROTOCOLS.message);
        break;
      case HttpStatusCode.PROCESSING:
        if (messages.PROCESSING) notifyUserFunc(messages.PROCESSING.type, messages.PROCESSING.message);
        break;
      case HttpStatusCode.OK:
        if (messages.OK) notifyUserFunc(messages.OK.type, messages.OK.message);
        break;
      case HttpStatusCode.CREATED:
        if (messages.CREATED) notifyUserFunc(messages.CREATED.type, messages.CREATED.message);
        break;
      case HttpStatusCode.ACCEPTED:
        if (messages.ACCEPTED) notifyUserFunc(messages.ACCEPTED.type, messages.ACCEPTED.message);
        break;
      case HttpStatusCode.NON_AUTHORITATIVE_INFORMATION:
        if (messages.NON_AUTHORITATIVE_INFORMATION) notifyUserFunc(messages.NON_AUTHORITATIVE_INFORMATION.type, messages.NON_AUTHORITATIVE_INFORMATION.message);
        break;
      case HttpStatusCode.NO_CONTENT:
        if (messages.NO_CONTENT) notifyUserFunc(messages.NO_CONTENT.type, messages.NO_CONTENT.message);
        break;
      case HttpStatusCode.RESET_CONTENT:
        if (messages.RESET_CONTENT) notifyUserFunc(messages.RESET_CONTENT.type, messages.RESET_CONTENT.message);
        break;
      case HttpStatusCode.PARTIAL_CONTENT:
        if (messages.PARTIAL_CONTENT) notifyUserFunc(messages.PARTIAL_CONTENT.type, messages.PARTIAL_CONTENT.message);
        break;
      case HttpStatusCode.MULTI_STATUS:
        if (messages.MULTI_STATUS) notifyUserFunc(messages.MULTI_STATUS.type, messages.MULTI_STATUS.message);
        break;
      case HttpStatusCode.ALREADY_REPORTED:
        if (messages.ALREADY_REPORTED) notifyUserFunc(messages.ALREADY_REPORTED.type, messages.ALREADY_REPORTED.message);
        break;
      case HttpStatusCode.IM_USED:
        if (messages.IM_USED) notifyUserFunc(messages.IM_USED.type, messages.IM_USED.message);
        break;
      case HttpStatusCode.MULTIPLE_CHOICES:
        if (messages.MULTIPLE_CHOICES) notifyUserFunc(messages.MULTIPLE_CHOICES.type, messages.MULTIPLE_CHOICES.message);
        break;
      case HttpStatusCode.MOVED_PERMANENTLY:
        if (messages.MOVED_PERMANENTLY) notifyUserFunc(messages.MOVED_PERMANENTLY.type, messages.MOVED_PERMANENTLY.message);
        break;
      case HttpStatusCode.FOUND:
        if (messages.FOUND) notifyUserFunc(messages.FOUND.type, messages.FOUND.message);
        break;
      case HttpStatusCode.SEE_OTHER:
        if (messages.SEE_OTHER) notifyUserFunc(messages.SEE_OTHER.type, messages.SEE_OTHER.message);
        break;
      case HttpStatusCode.NOT_MODIFIED:
        if (messages.NOT_MODIFIED) notifyUserFunc(messages.NOT_MODIFIED.type, messages.NOT_MODIFIED.message);
        break;
      case HttpStatusCode.USE_PROXY:
        if (messages.USE_PROXY) notifyUserFunc(messages.USE_PROXY.type, messages.USE_PROXY.message);
        break;
      case HttpStatusCode.SWITCH_PROXY:
        if (messages.SWITCH_PROXY) notifyUserFunc(messages.SWITCH_PROXY.type, messages.SWITCH_PROXY.message);
        break;
      case HttpStatusCode.TEMPORARY_REDIRECT:
        if (messages.TEMPORARY_REDIRECT) notifyUserFunc(messages.TEMPORARY_REDIRECT.type, messages.TEMPORARY_REDIRECT.message);
        break;
      case HttpStatusCode.PERMANENT_REDIRECT:
        if (messages.PERMANENT_REDIRECT) notifyUserFunc(messages.PERMANENT_REDIRECT.type, messages.PERMANENT_REDIRECT.message);
        break;
      case HttpStatusCode.BAD_REQUEST:
        if (messages.BAD_REQUEST) notifyUserFunc(messages.BAD_REQUEST.type, messages.BAD_REQUEST.message);
        break;
      case HttpStatusCode.UNAUTHORIZED:
        if (messages.UNAUTHORIZED) notifyUserFunc(messages.UNAUTHORIZED.type, messages.UNAUTHORIZED.message);
        break;
      case HttpStatusCode.PAYMENT_REQUIRED:
        if (messages.PAYMENT_REQUIRED) notifyUserFunc(messages.PAYMENT_REQUIRED.type, messages.PAYMENT_REQUIRED.message);
        break;
      case HttpStatusCode.FORBIDDEN:
        if (messages.FORBIDDEN) notifyUserFunc(messages.FORBIDDEN.type, messages.FORBIDDEN.message);
        break;
      case HttpStatusCode.NOT_FOUND:
        if (messages.NOT_FOUND) notifyUserFunc(messages.NOT_FOUND.type, messages.NOT_FOUND.message);
        break;
      case HttpStatusCode.METHOD_NOT_ALLOWED:
        if (messages.METHOD_NOT_ALLOWED) notifyUserFunc(messages.METHOD_NOT_ALLOWED.type, messages.METHOD_NOT_ALLOWED.message);
        break;
      case HttpStatusCode.NOT_ACCEPTABLE:
        if (messages.NOT_ACCEPTABLE) notifyUserFunc(messages.NOT_ACCEPTABLE.type, messages.NOT_ACCEPTABLE.message);
        break;
      case HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED:
        if (messages.PROXY_AUTHENTICATION_REQUIRED) notifyUserFunc(messages.PROXY_AUTHENTICATION_REQUIRED.type, messages.PROXY_AUTHENTICATION_REQUIRED.message);
        break;
      case HttpStatusCode.REQUEST_TIMEOUT:
        if (messages.REQUEST_TIMEOUT) notifyUserFunc(messages.REQUEST_TIMEOUT.type, messages.REQUEST_TIMEOUT.message);
        break;
      case HttpStatusCode.CONFLICT:
        if (messages.CONFLICT) notifyUserFunc(messages.CONFLICT.type, messages.CONFLICT.message);
        break;
      case HttpStatusCode.GONE:
        if (messages.GONE) notifyUserFunc(messages.GONE.type, messages.GONE.message);
        break;
      case HttpStatusCode.LENGTH_REQUIRED:
        if (messages.LENGTH_REQUIRED) notifyUserFunc(messages.LENGTH_REQUIRED.type, messages.LENGTH_REQUIRED.message);
        break;
      case HttpStatusCode.PRECONDITION_FAILED:
        if (messages.PRECONDITION_FAILED) notifyUserFunc(messages.PRECONDITION_FAILED.type, messages.PRECONDITION_FAILED.message);
        break;
      case HttpStatusCode.PAYLOAD_TOO_LARGE:
        if (messages.PAYLOAD_TOO_LARGE) notifyUserFunc(messages.PAYLOAD_TOO_LARGE.type, messages.PAYLOAD_TOO_LARGE.message);
        break;
      case HttpStatusCode.URI_TOO_LONG:
        if (messages.URI_TOO_LONG) notifyUserFunc(messages.URI_TOO_LONG.type, messages.URI_TOO_LONG.message);
        break;
      case HttpStatusCode.UNSUPPORTED_MEDIA_TYPE:
        if (messages.UNSUPPORTED_MEDIA_TYPE) notifyUserFunc(messages.UNSUPPORTED_MEDIA_TYPE.type, messages.UNSUPPORTED_MEDIA_TYPE.message);
        break;
      case HttpStatusCode.RANGE_NOT_SATISFIABLE:
        if (messages.RANGE_NOT_SATISFIABLE) notifyUserFunc(messages.RANGE_NOT_SATISFIABLE.type, messages.RANGE_NOT_SATISFIABLE.message);
        break;
      case HttpStatusCode.EXPECTATION_FAILED:
        if (messages.EXPECTATION_FAILED) notifyUserFunc(messages.EXPECTATION_FAILED.type, messages.EXPECTATION_FAILED.message);
        break;
      case HttpStatusCode.I_AM_A_TEAPOT:
        if (messages.I_AM_A_TEAPOT) notifyUserFunc(messages.I_AM_A_TEAPOT.type, messages.I_AM_A_TEAPOT.message);
        break;
      case HttpStatusCode.MISDIRECTED_REQUEST:
        if (messages.MISDIRECTED_REQUEST) notifyUserFunc(messages.MISDIRECTED_REQUEST.type, messages.MISDIRECTED_REQUEST.message);
        break;
      case HttpStatusCode.UNPROCESSABLE_ENTITY:
        if (messages.UNPROCESSABLE_ENTITY) notifyUserFunc(messages.UNPROCESSABLE_ENTITY.type, messages.UNPROCESSABLE_ENTITY.message);
        break;
      case HttpStatusCode.LOCKED:
        if (messages.LOCKED) notifyUserFunc(messages.LOCKED.type, messages.LOCKED.message);
        break;
      case HttpStatusCode.FAILED_DEPENDENCY:
        if (messages.FAILED_DEPENDENCY) notifyUserFunc(messages.FAILED_DEPENDENCY.type, messages.FAILED_DEPENDENCY.message);
        break;
      case HttpStatusCode.UPGRADE_REQUIRED:
        if (messages.UPGRADE_REQUIRED) notifyUserFunc(messages.UPGRADE_REQUIRED.type, messages.UPGRADE_REQUIRED.message);
        break;
      case HttpStatusCode.PRECONDITION_REQUIRED:
        if (messages.PRECONDITION_REQUIRED) notifyUserFunc(messages.PRECONDITION_REQUIRED.type, messages.PRECONDITION_REQUIRED.message);
        break;
      case HttpStatusCode.TOO_MANY_REQUESTS:
        if (messages.TOO_MANY_REQUESTS) notifyUserFunc(messages.TOO_MANY_REQUESTS.type, messages.TOO_MANY_REQUESTS.message);
        break;
      case HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE:
        if (messages.REQUEST_HEADER_FIELDS_TOO_LARGE) notifyUserFunc(messages.REQUEST_HEADER_FIELDS_TOO_LARGE.type, messages.REQUEST_HEADER_FIELDS_TOO_LARGE.message);
        break;
      case HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS:
        if (messages.UNAVAILABLE_FOR_LEGAL_REASONS) notifyUserFunc(messages.UNAVAILABLE_FOR_LEGAL_REASONS.type, messages.UNAVAILABLE_FOR_LEGAL_REASONS.message);
        break;
      case HttpStatusCode.INTERNAL_SERVER_ERROR:
        if (messages.INTERNAL_SERVER_ERROR) notifyUserFunc(messages.INTERNAL_SERVER_ERROR.type, messages.INTERNAL_SERVER_ERROR.message);
        break;
      case HttpStatusCode.NOT_IMPLEMENTED:
        if (messages.NOT_IMPLEMENTED) notifyUserFunc(messages.NOT_IMPLEMENTED.type, messages.NOT_IMPLEMENTED.message);
        break;
      case HttpStatusCode.BAD_GATEWAY:
        if (messages.BAD_GATEWAY) notifyUserFunc(messages.BAD_GATEWAY.type, messages.BAD_GATEWAY.message);
        break;
      case HttpStatusCode.SERVICE_UNAVAILABLE:
        if (messages.SERVICE_UNAVAILABLE) notifyUserFunc(messages.SERVICE_UNAVAILABLE.type, messages.SERVICE_UNAVAILABLE.message);
        break;
      case HttpStatusCode.GATEWAY_TIMEOUT:
        if (messages.GATEWAY_TIMEOUT) notifyUserFunc(messages.GATEWAY_TIMEOUT.type, messages.GATEWAY_TIMEOUT.message);
        break;
      case HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED:
        if (messages.HTTP_VERSION_NOT_SUPPORTED) notifyUserFunc(messages.HTTP_VERSION_NOT_SUPPORTED.type, messages.HTTP_VERSION_NOT_SUPPORTED.message);
        break;
      case HttpStatusCode.VARIANT_ALSO_NEGOTIATES:
        if (messages.VARIANT_ALSO_NEGOTIATES) notifyUserFunc(messages.VARIANT_ALSO_NEGOTIATES.type, messages.VARIANT_ALSO_NEGOTIATES.message);
        break;
      case HttpStatusCode.INSUFFICIENT_STORAGE:
        if (messages.INSUFFICIENT_STORAGE) notifyUserFunc(messages.INSUFFICIENT_STORAGE.type, messages.INSUFFICIENT_STORAGE.message);
        break;
      case HttpStatusCode.LOOP_DETECTED:
        if (messages.LOOP_DETECTED) notifyUserFunc(messages.LOOP_DETECTED.type, messages.LOOP_DETECTED.message);
        break;
      case HttpStatusCode.NOT_EXTENDED:
        if (messages.NOT_EXTENDED) notifyUserFunc(messages.NOT_EXTENDED.type, messages.NOT_EXTENDED.message);
        break;
      case HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED:
        if (messages.NETWORK_AUTHENTICATION_REQUIRED) notifyUserFunc(messages.NETWORK_AUTHENTICATION_REQUIRED.type, messages.NETWORK_AUTHENTICATION_REQUIRED.message);
        break;
      default:
        break;
    }
  }
}

