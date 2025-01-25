import { STATUS_UNAUTHORIZED } from './const';

class UnAuthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_UNAUTHORIZED;
    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }
}

export default UnAuthorizedError;
