import { singleton } from 'tsyringe'

@singleton()
export class ImportedProvider {
  baz() {
    return 'baz'
  }
}
