import { createTxDTOStub } from './__mocks__/create.transaction.dto.stub'
import { TransactionAggregate } from './transaction.aggregate'

describe(TransactionAggregate, () => {
  it('should be defined', () => {
    expect(TransactionAggregate).toBeDefined()
  })
  describe('#create', () => {
    const validTx = createTxDTOStub()
    const invalidTx = createTxDTOStub({
      amount: -1000.0,
      id: 'invalid-uuid',
      clientId: 'invalid-uuid',
      currency: 'invalid-currency',
    })

    it('should create a transaction', () => {
      const result = TransactionAggregate.create(validTx)
      expect(result.isOk).toBe(true)
    })

    it('should fail to create a transaction', () => {
      const result = TransactionAggregate.create(invalidTx)
      expect(result.isFail).toBe(true)
    })
  })
})
