import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ICommandBus } from '@deepblu/ddd'
import {
  CreateTransactionController,
  LoggerMiddleware,
} from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'
import { CommandBus } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/infra'

@Module({
  imports: [],
  controllers: [CreateTransactionController],
  providers: [{ provide: ICommandBus, useClass: CommandBus }],
  exports: [],
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'transaction', method: RequestMethod.POST })
  }

  onModuleInit() {
    console.log('TransactionModule initialized')
    // const commandbus = this.moduleRef.get<ICommandBus>(ICommandBus)
  }
}
