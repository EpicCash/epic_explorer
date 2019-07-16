import { HttpException } from './index';

export class IntegerValidationException extends HttpException {
  constructor(fieldName: String) {
    super(400, `${fieldName}  must be an integer`);
  }
}
