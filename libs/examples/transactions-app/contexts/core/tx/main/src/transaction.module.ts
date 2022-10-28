import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import {
  CreateTransactionController,
  LoggerMiddleware,
} from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'

@Module({
  imports: [],
  controllers: [CreateTransactionController],
  providers: [],
  exports: [],
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'transaction', method: RequestMethod.POST })
  }
}
