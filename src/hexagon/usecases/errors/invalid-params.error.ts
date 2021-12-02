export class InvalidParamsError extends Error {
  constructor(message = 'wrong parameters were sent', public code = 400) {
    super(message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, InvalidParamsError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}
