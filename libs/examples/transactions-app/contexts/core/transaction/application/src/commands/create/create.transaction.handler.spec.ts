import { Test, TestingModule } from '@nestjs/testing'
import { createTxDTOStub } from '../../__mocks__/create.transaction.dto.stub'
import { CreateTransaction } from './create.transaction.command'
import { CreateTransactionHandler } from './create.transaction.handler'

describe(CreateTransactionHandler, () => {
  let handler: CreateTransactionHandler
  let repo: TransactionRepo
  let saveSpy: jest.SpyInstance

  const validTx = createTxDTOStub()
  const invalidTx = createTxDTOStub({
    amount: -1000.0,
    id: 'invalid-uuid',
    clientId: 'invalid-uuid',
    currency: 'invalid-currency',
    date: 'invalid-date',
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTransactionHandler, TransactionRepoMock],
    }).compile()

    handler = module.get(CreateTransactionHandler)
    repo = module.get(TransactionRepo)
    saveSpy = jest.spyOn(repo, 'save')
  })

  it('should be defined', () => {
    expect(handler).toBeDefined()
  })

  describe('#handle', () => {
    describe('when the command is valid', () => {
      it('should delegate creation to TransactionRepo and return a successful result', async () => {
        const result = await handler.handle(CreateTransaction.with(validTx))
        expect(result.isOk).toBe(true)
        expect(saveSpy).toHaveBeenCalledWith(validTx)
      })
    })

    describe('when the command is valid', () => {
      it('should fail to create a transaction', async () => {
        const result = await handler.handle(CreateTransaction.with(invalidTx))
        expect(result.isFail).toBe(true)
        expect(saveSpy).not.toHaveBeenCalled()
      })
    })
  })
})
