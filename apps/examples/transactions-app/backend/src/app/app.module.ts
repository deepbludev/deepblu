import { Module } from '@nestjs/common'
import { TransactionModule } from '@deepblu/examples/transactions-app/contexts/core/tx/main'
import { StatusController } from './status.controller'

@Module({
  imports: [TransactionModule],
  controllers: [StatusController],
  providers: [],
})
export class AppModule {}
