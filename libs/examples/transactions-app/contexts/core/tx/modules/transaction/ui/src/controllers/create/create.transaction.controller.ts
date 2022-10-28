import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { BodyValidationPipe } from '../../pipes/body.validation.pipe'
import {
  CreateTransactionSchema,
  CreateTransactionDTO,
} from './create.transaction.dto'

@Controller('transaction')
export class CreateTransactionController {
  // constructor(private readonly creator: TransactionCreator) {}

  @Post()
  @UsePipes(BodyValidationPipe.with(CreateTransactionSchema))
  async create(@Body() input: CreateTransactionDTO) {
    // const { amount, currency } = await this.creator.run({
    //   ...input,
    //   amount: +input.amount,
    // })

    return { status: 'Success', input }
  }
}
