import {
  CreateAggregateStub,
  ToggleAggregateStub,
  UpdatePropsStub,
} from '../../domain/__mocks__'
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
export class UpdatePropsHandlerMock
  implements ICommandHandler<UpdatePropsStub>
{
  get subscription() {
    return UpdatePropsStub
  }

  private _handle: jest.Mock = jest.fn()
  async handle<E extends Error>(
    command: UpdatePropsStub
  ): Promise<Result<void, E>> {
    this._handle(command)
    return Result.ok()
  }
}

export class ToggleAggregateHandlerMock
  implements ICommandHandler<ToggleAggregateStub>
{
  get subscription() {
    return ToggleAggregateStub
  }

  private _handle: jest.Mock = jest.fn()
  async handle<E extends Error>(
    command: ToggleAggregateStub
  ): Promise<Result<void, E>> {
    this._handle(command)
    return Result.ok()
  }
}
