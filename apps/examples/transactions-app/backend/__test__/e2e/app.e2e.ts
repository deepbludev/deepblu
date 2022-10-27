import { HttpStatus } from '@nestjs/common'
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

  // describe('/transaction', () => {
  //   describe('POST', () => {
  //     describe('when touching endpoint', () => {
  //       it('should return 200 when body is valid', () => {
  //         return e2e
  //           .request()
  //           .post('/transaction')
  //           .send(txInputStub({ clientId: 1 }))
  //           .expect(HttpStatus.CREATED)
  //       })

  //       it('should return 400 when body is invalid', () => {
  //         return e2e
  //           .request()
  //           .post('/transaction')
  //           .send({ clientId: 1 })
  //           .expect(HttpStatus.BAD_REQUEST)
  //       })
  //     })
  //   })
  // })
})
