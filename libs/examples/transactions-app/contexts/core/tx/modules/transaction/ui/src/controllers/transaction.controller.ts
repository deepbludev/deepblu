import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { BodyValidationPipe } from '../pipes/body.validation.pipe'
import {
  CreateTransactionSchema,
  CreateTransactionRequestDTO,
} from './create.transaction.dto'

@Controller('transaction')
export class TransactionController {
  // constructor(private readonly creator: TransactionCreator) {}

  @Post()
  @UsePipes(BodyValidationPipe.with(CreateTransactionSchema))
  async create(@Body() input: CreateTransactionRequestDTO) {
    // const { amount, currency } = await this.creator.run({
    //   ...input,
    //   amount: +input.amount,
    // })

    return { status: 'success', input }
  }
}
