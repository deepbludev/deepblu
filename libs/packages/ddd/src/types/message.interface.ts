/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMessage<P = any> {
  name: string
  payload: P
}
