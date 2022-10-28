import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { TransactionController } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'
import { LoggerMiddleware } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/infra'

@Module({
  imports: [],
  controllers: [TransactionController],
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
