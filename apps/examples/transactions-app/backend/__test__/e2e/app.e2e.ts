import { HttpStatus } from '@nestjs/common'
import { createTxDTOStub } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { TestEnvironment } from '../utils/test-environment.util'

describe('AppController (e2e)', () => {
  let e2e: TestEnvironment

  beforeEach(async () => {
    e2e = await TestEnvironment.init()
  })

  afterEach(async () => {
    await e2e.close()
  })

  describe('/status', () => {
    describe('GET', () => {
      it('returns http status 200 OK', () => {
        return e2e.request().get('/status').expect(HttpStatus.OK)
      })
    })
  })

  describe('/transaction', () => {
    describe('POST', () => {
      describe('when touching endpoint', () => {
        it('should return 201 when body is valid', () => {
          return e2e
            .request()
            .post('/transaction')
            .send(createTxDTOStub())
            .expect(HttpStatus.CREATED)
            .expect({
              statusCode: HttpStatus.CREATED,
              status: 'Transaction created successfully',
              data: {
                ...createTxDTOStub(),
                commission: 0.5,
                currency: 'EUR',
              },
            })
        })

        it('should return 422 when body is invalid', () => {
          return e2e
            .request()
            .post('/transaction')
            .send({
              date: '2022-10-241',
              amount: -1000.0,
              currency: 'USDA',
              clientId: '88cc384c-eb13-4eee-af43-9f64c36f9e98_',
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY)
            .expect({
              statusCode: 422,
              message:
                'Input validation failed - ' +
                'date: Date must be a valid date, ' +
                'amount: Amount must be a positive number, ' +
                'currency: Currency must be a valid currency (e.g. USD, EUR, GBP, JPY), ' +
                'clientId: Client ID must be a valid UUID',
              error: 'Unprocessable Entity',
            })
        })
      })
    })
  })
})
