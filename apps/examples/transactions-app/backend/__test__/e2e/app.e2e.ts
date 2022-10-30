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
          const dto = createTxDTOStub()
          return e2e
            .request()
            .post('/transaction')
            .send(dto)
            .expect(HttpStatus.CREATED)
            .expect({
              statusCode: HttpStatus.CREATED,
              status: 'Transaction created successfully',
              data: { id: dto.id },
            })
        })

        it('should return 422 when body is invalid', () => {
          return e2e
            .request()
            .post('/transaction')
            .send({
              id: '88cc384c-eb13-4eee-af43-9f64c36f9e99_',
              date: '2022-10-24_',
              amount: -1000.0,
              currency: 'USD_',
              clientId: '88cc384c-eb13-4eee-af43-9f64c36f9e98_',
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY)
            .expect({
              statusCode: 422,
              message:
                'Input validation failed - ' +
                [
                  'id: Transaction ID must be a valid UUID',
                  'clientId: Client ID must be a valid UUID',
                  'date: Date must be a valid date',
                  'amount: Amount must be a positive number',
                  'currency: Currency must be a valid currency (e.g. USD, EUR, GBP, JPY)',
                ].join(', '),
              error: 'Unprocessable Entity',
            })
        })
      })
    })
  })
})
