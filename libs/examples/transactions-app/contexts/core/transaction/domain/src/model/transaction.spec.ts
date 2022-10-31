import { createTxDTOStub } from '../__mocks__/create.transaction.dto.stub'
import { Transaction } from '../model/transaction.aggregate'
import { CreateTransactionDTO } from '../dto/create.transaction.dto'

describe(Transaction, () => {
  it('should be defined', () => {
    expect(Transaction).toBeDefined()
  })

  describe('#create', () => {
    const validTx = createTxDTOStub()

    describe('when given a valid transaction DTO', () => {
      const { data: tx, isOk } = Transaction.create(validTx)

      it('should create a transaction', () => {
        expect(isOk).toBe(true)
        expect(tx).toBeDefined()
        expect(tx.id.value).toEqual(validTx.id)
        expect(tx.clientId.value).toEqual(validTx.clientId)
        expect(tx.amount.value).toEqual(validTx.amount)
        expect(tx.currency.value).toEqual(validTx.currency)
      })
      it.todo('should set the tx createdAt date')
      it.todo('should emit a transaction created event')
    })

    describe('when given an invalid transaction DTO', () => {
      const expectFailureWith = (invalidTx: CreateTransactionDTO) => {
        const { data, isFail, error } = Transaction.create(invalidTx)
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
    })
  })
})
