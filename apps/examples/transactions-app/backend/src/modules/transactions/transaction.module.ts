import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { TransactionController } from './controllers/transaction.controller'
import { LoggerMiddleware } from '../shared/middleware/logger/logger.middleware'

@Module({
  imports: [],
  controllers: [TransactionController],
  exports: [],
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'transaction', method: RequestMethod.POST })
  }
}
