import { Controller, Post, Body } from '@nestjs/common'
import { CreateTransactionRequestDTO } from './transaction.dto'

@Controller('transaction')
export class TransactionController {
  // constructor(private readonly creator: TransactionCreator) {}

  @Post()
  // @UsePipes(new BodyValidationPipe(transactionBodySchema))
  async create(@Body() input: CreateTransactionRequestDTO) {
    // const { amount, currency } = await this.creator.run({
    //   ...input,
    //   amount: +input.amount,
    // })

    return { status: 'success', input }
  }
}
