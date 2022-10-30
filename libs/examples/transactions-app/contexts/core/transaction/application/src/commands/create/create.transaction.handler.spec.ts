import { Test, TestingModule } from '@nestjs/testing'

import { CreateTransactionHandler } from './create.transaction.handler'

describe(CreateTransactionHandler, () => {
  let handler: CreateTransactionHandler

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTransactionHandler],
    }).compile()

    handler = module.get(CreateTransactionHandler)
  })

  it('should be defined', () => {
    expect(handler).toBeDefined()
  })
})
