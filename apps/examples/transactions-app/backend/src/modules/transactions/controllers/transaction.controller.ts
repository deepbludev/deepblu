import { ICommandBus } from '@deepblu/ddd'
import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { BodyValidationPipe } from '../../shared/pipes/body.validation.pipe'
import {
  CreateTransaction,
  CreateTransactionDTO,
  CreateTransactionSchema,
} from '@deepblu/examples/transactions-app/contexts/core/transaction/application'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly commandbus: ICommandBus) {}

  @Post()
  @UsePipes(BodyValidationPipe.with(CreateTransactionSchema))
  async create(@Body() dto: CreateTransactionDTO) {
    this.commandbus.dispatch(CreateTransaction.with(dto))

    return { status: 'Success', dto }
  }
}
