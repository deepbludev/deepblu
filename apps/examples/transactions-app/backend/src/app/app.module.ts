import { Module } from '@nestjs/common'

import { StatusController } from './status.controller'

@Module({
  imports: [],
  controllers: [StatusController],
  providers: [],
})
export class AppModule {}
