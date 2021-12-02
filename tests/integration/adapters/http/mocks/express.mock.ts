export const makeExpressResponseMock = (): any => ({
  status: statusCode => ({
    send: (result = undefined) => ({
      statusCode,
      result
    })
  })
})
