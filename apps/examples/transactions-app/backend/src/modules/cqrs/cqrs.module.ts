import { Global, Module } from '@nestjs/common'
import { ICommandBus } from '@deepblu/ddd'
import { CommandBus } from './commandbus'

@Global()
@Module({
  providers: [{ provide: ICommandBus, useClass: CommandBus }],
  exports: [ICommandBus],
})
export class CqrsModule {}
