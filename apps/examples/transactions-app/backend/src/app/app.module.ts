import { Module } from '@nestjs/common'
import { StatusController } from './status.controller'
import { CqrsModule } from '../modules/cqrs/cqrs.module'
import { TransactionModule } from '../modules/transactions/transaction.module'

@Module({
  imports: [TransactionModule, CqrsModule],
  controllers: [StatusController],
})
export class AppModule {}
