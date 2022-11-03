import { createTxDTOStub } from '../../__mocks__/create.transaction.dto.stub'
import { Transaction } from './transaction.aggregate'
import { CreateTransactionDTO } from './dto/create.transaction.dto'

describe(Transaction, () => {
  it('should be defined', () => {
    expect(Transaction).toBeDefined()
  })

  describe('#create', () => {
    const validTx = { ...createTxDTOStub(), commission: 0.05 }

    describe('when given a valid transaction DTO', () => {
      const today = new Date().setMilliseconds(0)
      const { data: tx, isOk } = Transaction.create(validTx)

      it('should create a transaction with the given props', () => {
        expect(isOk).toBe(true)
        expect(tx).toBeDefined()
        expect(tx.id.value).toEqual(validTx.id)
        expect(tx.clientId.value).toEqual(validTx.clientId)
        expect(tx.amount.value).toEqual(validTx.amount)
        expect(tx.currency.value).toEqual(validTx.currency)
        expect(tx.commission.value).toEqual(validTx.commission)
      })

      it('should set the tx createdAt date to today', () => {
        expect(tx.createdAt.setMilliseconds(0)).toEqual(today)
      })

      it('should emit a transaction created event', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...props } = validTx
        const { changes, createdAt } = tx
        const createdEvent = changes[0]

        expect(changes).toHaveLength(1)
        expect(createdEvent.aggregateId).toEqual(validTx.id)
        expect(createdEvent.aggregateName).toEqual('Transaction')
        expect(createdEvent.name).toEqual('TransactionCreated')
        expect(createdEvent.canonical).toEqual(
          'transaction.transaction_created'
        )
        expect(createdEvent.payload).toEqual({ ...props, createdAt })
      })
    })

    describe('when given an invalid transaction DTO', () => {
      const expectFailureWith = (
        invalidTx: CreateTransactionDTO,
        commission?: number
      ) => {
        const { data, isFail, error } = Transaction.create({
          ...invalidTx,
          commission: commission ?? 0.05,
        })
        expect(isFail).toBe(true)
        expect(data).toBeNull()
        expect(error).toEqual(error)
      }

      it('should fail with an invalid tx id', () =>
        expectFailureWith(createTxDTOStub({ id: 'invalid-uuid' })))

      it('should fail with an invalid client id', () =>
        expectFailureWith(createTxDTOStub({ clientId: 'invalid-uuid' })))

      it('should fail with an invalid tx amount', () =>
        expectFailureWith(createTxDTOStub({ amount: -1000.0 })))

      it('should fail with an invalid tx currency', () =>
        expectFailureWith(createTxDTOStub({ currency: 'invalid-currency' })))

      it('should fail with an invalid tx commission', () =>
        expectFailureWith(createTxDTOStub(), -0.05))
    })
  })
})
