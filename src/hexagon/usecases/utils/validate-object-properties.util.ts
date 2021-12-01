/* eslint-disable @typescript-eslint/indent */
export const validateObjectProperties =
  (requiredProps: string[] = []) =>
  (data: {}) => {
    const falsyProperty = (prop: string) => !data[prop]

    return requiredProps.some(falsyProperty)
  }
