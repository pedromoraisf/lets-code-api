export class InvalidIdProvidedError extends Error {
  constructor(message = 'invalid id provided', public code = 404) {
    super(message)

    this.name = this.constructor.name

    Object.setPrototypeOf(this, InvalidIdProvidedError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}
