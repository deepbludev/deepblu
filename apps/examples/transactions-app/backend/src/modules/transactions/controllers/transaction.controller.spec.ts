import { Test, TestingModule } from '@nestjs/testing'
import { ICommandBus } from '@deepblu/ddd'
import { CreateTransaction } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { createTxDTOStub } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { transactionModuleMock } from '../__mocks__/transaction.module.mock'
import { TransactionController } from './transaction.controller'

describe(TransactionController, () => {
  let txCtrl: TransactionController
  let dispatchSpy: jest.SpyInstance

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule(
      transactionModuleMock()
    ).compile()

    txCtrl = app.get(TransactionController)
    dispatchSpy = jest.spyOn(app.get<ICommandBus>(ICommandBus), 'dispatch')
  })

  it('should be defined', () => {
    expect(txCtrl).toBeDefined()
  })

  describe('create', () => {
    it('should return success when body is valid', async () => {
      const dto = createTxDTOStub()
      const result = await txCtrl.create(dto)

      expect(result).toEqual({ status: 'Success', dto })
      expect(dispatchSpy).toHaveBeenCalledWith(CreateTransaction.with(dto))
    })
  })
})
