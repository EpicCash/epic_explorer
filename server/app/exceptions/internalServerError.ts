import { HttpException } from './index';

export class InternalServerErrorException extends HttpException {
  constructor(error: any) {
    super(500, 'Internal Server Error!!', error);
  }
}
