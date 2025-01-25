import { NOT_FOUND_CODE } from './const';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND_CODE;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
