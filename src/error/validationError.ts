import { DATA_ERROR_CODE } from './const';

class ValidationError extends Error {
  statusCode: number;

  // eslint-disable-next-line no-unused-vars
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = DATA_ERROR_CODE;
  }
}

export default ValidationError;
