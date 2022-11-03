import { Injectable } from '@nestjs/common'
import { InMemoryAsyncEventBus } from '@deepblu/ddd'

@Injectable()
export class EventBus extends InMemoryAsyncEventBus {
  constructor() {
    super()
  }
}
