import { Global, Injectable, Module } from '@nestjs/common'
import { ICommandBus } from '@deepblu/ddd'

@Injectable()
export class CommandBusMock implements ICommandBus {
  dispatch = jest.fn()
}

@Global()
@Module({
  providers: [{ provide: ICommandBus, useClass: CommandBusMock }],
  exports: [ICommandBus],
})
export class CqrsModuleMock {}
