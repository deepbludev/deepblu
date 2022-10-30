import { Injectable } from '@nestjs/common'
import { InMemoryCommandBus } from '@deepblu/ddd'
import { transactionCommandHandlers } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'

@Injectable()
export class CommandBus extends InMemoryCommandBus {
  constructor() {
    super()
    this.register(transactionCommandHandlers.map(handler => new handler()))
  }
}
