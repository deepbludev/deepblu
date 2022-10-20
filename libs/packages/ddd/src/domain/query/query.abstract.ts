import { Constructor, IMessage, IPayload, Payload } from '../../domain'

export abstract class IQuery<P extends IPayload = IPayload>
  implements IMessage<P>
{
  constructor(public readonly payload: P) {}
}

export abstract class Query<P extends IPayload = IPayload> extends IQuery<P> {
  /**
   * Creates a new Query from payload
   * @factory
   */
  static with<Q extends IQuery = IQuery>(payload: Payload<Q>): Q {
    return Reflect.construct(this, [payload])
  }
}

export interface IQueryFactory<P extends IPayload = IPayload> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  with: (payload: P) => any
}

export type QueryClass<P extends IPayload = IPayload> = Constructor &
  IQueryFactory<P>
