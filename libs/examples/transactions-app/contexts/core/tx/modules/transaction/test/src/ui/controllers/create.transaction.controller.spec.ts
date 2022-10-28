import { Test, TestingModule } from '@nestjs/testing'
import { CreateTransactionController } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'
import { transactionModuleMock } from '../../__mocks__/transaction.module.mock'
import { txInputStub } from '../../__mocks__/transaction-input.stub'

describe(CreateTransactionController.name, () => {
  let txCtrl: CreateTransactionController
  // let txCreatorSpy: jest.SpyInstance

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule(
      transactionModuleMock()
    ).compile()

    txCtrl = app.get(CreateTransactionController)
    // txCreatorSpy = jest.spyOn(
    //   app.get<TransactionCreator>(TransactionCreator),
    //   'run'
    // )
  })

  it('should be defined', () => {
    expect(txCtrl).toBeDefined()
  })

  describe('create', () => {
    it('should return success when body is valid', async () => {
      const input = txInputStub()
      const result = await txCtrl.create(input)

      expect(result).toEqual({ status: 'Success', input })
      // expect(txCreatorSpy).toHaveBeenCalledWith({
      //   ...input,
      //   amount: +input.amount,
      // })
    })
  })
})
