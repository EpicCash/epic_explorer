export class HttpException extends Error {
  public status: number;
  public message: any;
  public error: any;
  constructor(status: number, message: any, error?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
