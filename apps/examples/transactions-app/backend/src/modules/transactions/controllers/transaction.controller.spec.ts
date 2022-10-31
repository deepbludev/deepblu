import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus } from '@nestjs/common'
import { Result } from '@deepblu/ddd'
import {
  commandbusMock,
  CqrsModuleMock,
} from '@deepblu/examples/transactions-app/contexts/shared/application'
import { CreateTransaction } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { createTxDTOStub } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'
import { TransactionController } from './transaction.controller'

describe(TransactionController, () => {
  let app: TestingModule
  let txCtrl: TransactionController
  let dispatchSpy: jest.SpyInstance

  const createTxDto = createTxDTOStub()

  const response = {
    statusCode: HttpStatus.CREATED,
    status: 'Transaction created successfully',
    data: { id: createTxDto.id },
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [CqrsModuleMock],
      controllers: [TransactionController],
    }).compile()

    txCtrl = app.get(TransactionController)
  })

  it('should be defined', () => {
    expect(txCtrl).toBeDefined()
  })

  describe('#create', () => {
    beforeAll(async () => {
      commandbusMock.dispatch = jest
        .fn()
        .mockReturnValue(Promise.resolve(Result.ok()))
      dispatchSpy = jest.spyOn(commandbusMock, 'dispatch')
    })

    it('should return success and delegate to commandbus when body is valid', async () => {
      expect(await txCtrl.create(createTxDto)).toEqual(response)
      expect(dispatchSpy).toHaveBeenCalledWith(
        CreateTransaction.with(createTxDto)
      )
    })
  })
})
