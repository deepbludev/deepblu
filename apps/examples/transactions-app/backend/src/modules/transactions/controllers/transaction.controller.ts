import { ICommandBus } from '@deepblu/ddd'
import { Controller, Post, Body, UsePipes, HttpStatus } from '@nestjs/common'
import { BodyValidationPipe } from '../../shared/pipes/body.validation.pipe'
import { CreateTransaction } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import {
  CreateTransactionDTO,
  CreateTransactionSchema,
} from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly commandbus: ICommandBus) {}

  @Post()
  @UsePipes(BodyValidationPipe.with(CreateTransactionSchema))
  async create(@Body() dto: CreateTransactionDTO) {
    const response = await this.commandbus.dispatch(CreateTransaction.with(dto))

    if (response.isOk)
      return {
        statusCode: HttpStatus.CREATED,
        status: 'Transaction created successfully',
        data: { id: dto.id },
      }
  }
}
