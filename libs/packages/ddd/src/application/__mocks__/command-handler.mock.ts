import {
  CreateAggregateStub,
  ToggleAggregateStub,
  UpdatePropsStub,
} from '../../domain/__mocks__'
import {
  commandHandler,
  ICommandHandler,
  ICommandHandlerResponse,
  Result,
} from '../../domain'

@commandHandler(CreateAggregateStub)
export class CreateAggregateHandlerMock extends ICommandHandler<CreateAggregateStub> {
  _handle: jest.Mock = jest.fn()

  async handle<E extends Error>(
    command: CreateAggregateStub
  ): ICommandHandlerResponse<E> {
    this._handle(command)
    return Result.ok()
  }
}
export class UpdatePropsHandlerMock extends ICommandHandler<UpdatePropsStub> {
  static override readonly subscription = UpdatePropsStub
  _handle: jest.Mock = jest.fn()

  async handle<E extends Error>(
    command: UpdatePropsStub
  ): ICommandHandlerResponse<E> {
    this._handle(command)
    return Result.ok()
  }
}

export class ToggleAggregateHandlerMock extends ICommandHandler<ToggleAggregateStub> {
  _handle: jest.Mock = jest.fn()

  override get subscription() {
    return ToggleAggregateStub
  }

  async handle<E extends Error>(
    command: ToggleAggregateStub
  ): Promise<Result<void, E>> {
    this._handle(command)
    return Result.ok()
  }
}
