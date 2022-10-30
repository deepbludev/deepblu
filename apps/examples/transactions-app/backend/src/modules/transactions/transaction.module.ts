import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { TransactionController } from './controllers/transaction.controller'
import { LoggerMiddleware } from '../shared/middleware/logger/logger.middleware'
// import { TransactionRepo } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'

@Module({
  imports: [],
  controllers: [TransactionController],
  // providers: [{ provide: TransactionRepo, useClass: TransactionRepo }],
  exports: [],
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'transaction', method: RequestMethod.POST })
  }
}
