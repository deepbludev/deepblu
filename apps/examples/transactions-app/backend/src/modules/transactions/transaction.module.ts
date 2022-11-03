import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { TransactionRepo } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'
import {
  InMemoryTransactionEventStream,
  TransactionEventStore,
  TransactionEventStream,
} from '@deepblu/examples/transactions-app/contexts/core/transaction/infrastructure'
import { TransactionController } from './controllers/transaction.controller'
import { LoggerMiddleware } from '../shared/middleware/logger/logger.middleware'

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionEventStream,
      useClass: InMemoryTransactionEventStream,
    },
    { provide: TransactionRepo, useClass: TransactionEventStore },
  ],
  exports: [TransactionRepo, TransactionEventStream],
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'transaction', method: RequestMethod.POST })
  }
}
