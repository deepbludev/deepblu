import { InMemoryCommandBus } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CommandBus extends InMemoryCommandBus {}
