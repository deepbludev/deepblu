import { Test, TestingModule } from '@nestjs/testing'
import { TransactionController } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'
import { transactionModuleMock } from '../../__mocks__/transaction.module.mock'
import { txInputStub } from '../../__mocks__/transaction-input.stub'

describe(TransactionController.name, () => {
  let txCtrl: TransactionController
  // let txCreatorSpy: jest.SpyInstance

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule(
      transactionModuleMock()
    ).compile()

    txCtrl = app.get(TransactionController)
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
      const input = txInputStub({ clientId: '1' })
      const result = await txCtrl.create(input)

      expect(result).toEqual({ status: 'success', input })
      // expect(txCreatorSpy).toHaveBeenCalledWith({
      //   ...input,
      //   amount: +input.amount,
      // })
    })
  })
})
