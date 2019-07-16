import { HttpException } from './index';

export class NoDataFoundException extends HttpException {
  constructor() {
    super(404, 'No Data Found');
  }
}
