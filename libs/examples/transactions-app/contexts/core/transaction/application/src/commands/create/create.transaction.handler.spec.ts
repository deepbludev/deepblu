import { Test, TestingModule } from '@nestjs/testing'
import {
  createTxDTOStub,
  Transaction,
  TransactionRepo,
} from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'
import { TransactionRepoMock } from '../../__mocks__/transaction.repo.mock'
import { CreateTransaction } from './create.transaction.command'
import { CreateTransactionHandler } from './create.transaction.handler'
import { AggregateAlreadyExistsError, Result } from '@deepblu/ddd'

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
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionHandler,
        {
          provide: TransactionRepo,
          useClass: TransactionRepoMock,
        },
      ],
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
      let command: CreateTransaction

      beforeEach(() => {
        command = CreateTransaction.with(validTx)
      })

      it('should delegate creation to TransactionRepo and return a successful result', async () => {
        const result = await handler.handle(command)

        expect(result.isOk).toBe(true)
        expect(saveSpy).toHaveBeenCalled()
      })

      it.todo('should delegate commission calculation to CommissionService')

      it('should fail if tx id already exists', async () => {
        repo.exists = jest.fn().mockResolvedValue(true)

        const result = await handler.handle(command)

        expect(result).toEqual(
          Result.fail(
            AggregateAlreadyExistsError.with(validTx.id, Transaction.name)
          )
        )
        expect(saveSpy).not.toHaveBeenCalled()
      })
    })

    describe('when the command is invalid', () => {
      it('should fail to create a transaction', async () => {
        const result = await handler.handle(CreateTransaction.with(invalidTx))
        expect(result.isFail).toBe(true)
        expect(saveSpy).not.toHaveBeenCalled()
      })
    })
  })
})
