import { Module } from '@nestjs/common'
import { TransactionController } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [],
  exports: [],
})
export class TransactionModule {}

// export class TransactionModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'transaction', method: RequestMethod.POST })
//   }
// }
