import { ICommandBus } from '@deepblu/ddd'
import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { BodyValidationPipe } from '../../pipes/body.validation.pipe'
import {
  CreateTransaction,
  CreateTransactionDTO,
  CreateTransactionSchema,
} from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/application'

@Controller('transaction')
export class CreateTransactionController {
  constructor(private readonly commandbus: ICommandBus) {}

  @Post()
  @UsePipes(BodyValidationPipe.with(CreateTransactionSchema))
  async create(@Body() input: CreateTransactionDTO) {
    this.commandbus.dispatch(CreateTransaction.with(input))

    return { status: 'Success', input }
  }
}
