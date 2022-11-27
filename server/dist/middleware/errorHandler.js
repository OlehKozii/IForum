"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.ErrorMiddleware = void 0;
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    static badRequest(message) {
        return new CustomError(400, message);
    }
    static unauthorized(message) {
        return new CustomError(401, message);
    }
    static forbidden(message) {
        return new CustomError(403, message);
    }
    static notFound(message) {
        return new CustomError(404, message);
    }
    static unsupportedMedia(message) {
        return new CustomError(415, message);
    }
    static teapot(message) {
        return new CustomError(418, message);
    }
    static internal(message) {
        return new CustomError(500, message);
    }
}
exports.CustomError = CustomError;
const ErrorMiddleware = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(400).json({ message: "Unexpected error" });
};
exports.ErrorMiddleware = ErrorMiddleware;
