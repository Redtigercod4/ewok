export default class ErrorController {
  public static InternalServerError(
    message: string = "Internal Server Error"
  ): HandleError {
    return new HandleError(message, 500);
  }

  public static NotFoundError(
    message: string = "Resource Not Found"
  ): HandleError {
    return new HandleError(message, 404);
  }
}

export class HandleError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
