import { Global, Module } from '@nestjs/common'
import { ICommandBus } from '@deepblu/ddd'

export const commandbusMock = {
  dispatch: jest.fn(),
}

@Global()
@Module({
  providers: [{ provide: ICommandBus, useValue: commandbusMock }],
  exports: [ICommandBus],
})
export class CqrsModuleMock {}
