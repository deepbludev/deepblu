import { Test, TestingModule } from '@nestjs/testing'
import { StatusController } from '../status.controller'

describe('StatusController', () => {
  let app: TestingModule
  let statusCtrl: StatusController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [],
    }).compile()

    statusCtrl = app.get(StatusController)
  })

  describe('/status GET', () => {
    it('should return "Welcome to backend!"', () => {
      expect(statusCtrl.status()).toEqual({
        message: '[transactions-app] All systems operational',
      })
    })
  })
})
