import { Global, Module } from '@nestjs/common'
import { ICommandBus, Result } from '@deepblu/ddd'

export const commandbusMock = {
  dispatch: () => Promise.resolve(Result.ok()),
}

@Global()
@Module({
  providers: [{ provide: ICommandBus, useValue: commandbusMock }],
  exports: [ICommandBus],
})
export class CqrsModuleMock {}
