import { STATUS_FORBIDDEN } from './const';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export default ForbiddenError;
