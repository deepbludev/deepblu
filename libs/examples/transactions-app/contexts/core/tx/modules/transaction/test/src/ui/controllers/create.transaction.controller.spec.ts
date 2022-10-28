import { Test, TestingModule } from '@nestjs/testing'
import { ICommandBus } from '@deepblu/ddd'
import { CreateTransactionController } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'
import { CreateTransaction } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/application'
import { transactionModuleMock } from '../../__mocks__/transaction.module.mock'
import { txInputStub } from '../../__mocks__/transaction-input.stub'

describe(CreateTransactionController.name, () => {
  let txCtrl: CreateTransactionController
  let dispatchSpy: jest.SpyInstance

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule(
      transactionModuleMock()
    ).compile()

    txCtrl = app.get(CreateTransactionController)
    dispatchSpy = jest.spyOn(app.get<ICommandBus>(ICommandBus), 'dispatch')
  })

  it('should be defined', () => {
    expect(txCtrl).toBeDefined()
  })

  describe('create', () => {
    it('should return success when body is valid', async () => {
      const input = txInputStub()
      const result = await txCtrl.create(input)

      expect(result).toEqual({ status: 'Success', input })
      // expect(dispatchSpy).toHaveBeenCalled()
      expect(dispatchSpy).toHaveBeenCalledWith(CreateTransaction.with(input))
    })
  })
})
