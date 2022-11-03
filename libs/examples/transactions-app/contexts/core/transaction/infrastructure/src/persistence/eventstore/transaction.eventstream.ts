import { Injectable } from '@nestjs/common'
import { IEventStream } from '@deepblu/ddd'

@Injectable()
export abstract class TransactionEventStream extends IEventStream {}
