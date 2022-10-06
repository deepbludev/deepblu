/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IEventPayload {
  [key: string]: any
}

export interface IEvent<P extends IEventPayload = Record<string, never>> {
  aggregateName: string
  aggregateId: string
  payload: P
  timestamp: number // in milliseconds
}
