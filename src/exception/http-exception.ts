export class HttpException extends Error {
  status: number;
  message: string;
  errors?: string[];
  constructor(status: number = 500, message: string = "Internal Server Error", error?: string[]) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = error
  }
}
