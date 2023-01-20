import { ErrorCode } from "./error-codes";

export abstract class CustomError {
  code: ErrorCode;
  message: string;
  error: any;

  constructor(code: ErrorCode, message: string, error?: any) {
    this.code = code;
    this.message = message;
    this.error = error;
  }
}

export class InternalServerError extends CustomError {}

export class ResourceNotFound extends CustomError {}

export class BadRequest extends CustomError {}

export class DuplicatedError extends CustomError {}

export class UnauthorizedError extends CustomError {}
