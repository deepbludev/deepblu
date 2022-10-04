import { module } from '../../module.decorator'
import { ImportedProvider } from './imported-provider'
@module({
  providers: [{ token: ImportedProvider.name, useClass: ImportedProvider }],
})
export class ImportedModule {}
