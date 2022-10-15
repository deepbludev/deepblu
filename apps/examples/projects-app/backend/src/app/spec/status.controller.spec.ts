import { Test, TestingModule } from '@nestjs/testing'
import { StatusController } from '../status.controller'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [StatusController],
    }).compile()
  })

  describe('status', () => {
    it('should return API server status', () => {
      const appController = app.get<StatusController>(StatusController)
      expect(appController.status()).toEqual({
        message: '[projects-app API] All systems operational.',
      })
    })
  })
})
