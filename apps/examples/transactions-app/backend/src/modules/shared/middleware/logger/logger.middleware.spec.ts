import * as httpMocks from 'node-mocks-http'

import { LoggerMiddleware } from './logger.middleware'

describe(LoggerMiddleware, () => {
  it('should be defined', () => {
    expect(new LoggerMiddleware()).toBeDefined()
  })

  it('should log the request', () => {
    const loggerMiddleware = new LoggerMiddleware()
    const req = httpMocks.createRequest()
    const res = httpMocks.createResponse()
    const next = jest.fn()
    const consoleSpy = jest.spyOn(console, 'log')

    loggerMiddleware.use(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith('[LOG] - Request: {}')
  })
})
