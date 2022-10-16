import { CreateAggregateStub } from '../../domain/__mocks__'
import { ICommandHandler, InvalidPropError, Result } from '../../domain'

export class CreateAggregateHandlerMock
  implements ICommandHandler<CreateAggregateStub>
{
  get subscription() {
    return CreateAggregateStub
  }

  private _handle: jest.Mock = jest.fn()
  async handle<E extends Error = InvalidPropError>(
    command: CreateAggregateStub
  ): Promise<Result<void, E>> {
    this._handle(command)
    return Result.ok()
  }
}
