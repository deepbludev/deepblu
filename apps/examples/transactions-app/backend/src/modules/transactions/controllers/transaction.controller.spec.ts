import { Test, TestingModule } from '@nestjs/testing'
import { Currency } from '@deepblu/examples/transactions-app/contexts/shared/domain'
import { CreateTransaction } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { createTxDTOStub } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { TransactionController } from './transaction.controller'
import {
  commandbusMock,
  CqrsModuleMock,
} from '@deepblu/examples/transactions-app/contexts/shared/application'
import { HttpStatus } from '@nestjs/common'

describe(TransactionController, () => {
  let txCtrl: TransactionController
  let dispatchSpy: jest.SpyInstance
  const dto = createTxDTOStub()
  const response = {
    statusCode: HttpStatus.CREATED,
    status: 'Transaction created successfully',
    data: { ...dto, commission: 1, currency: Currency.EUR },
  }

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CqrsModuleMock],
      controllers: [TransactionController],
    }).compile()

    commandbusMock.dispatch.mockReturnValue(Promise.resolve(response))
    txCtrl = app.get(TransactionController)
    dispatchSpy = jest.spyOn(commandbusMock, 'dispatch')
  })

  it('should be defined', () => {
    expect(txCtrl).toBeDefined()
  })

  describe('create', () => {
    it('should return success and delegate to commandbus when body is valid', async () => {
      expect(await txCtrl.create(dto)).toEqual(response)
      expect(dispatchSpy).toHaveBeenCalledWith(CreateTransaction.with(dto))
    })
  })
})
