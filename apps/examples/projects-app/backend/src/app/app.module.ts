import { Module } from '@nestjs/common'

import { StatusController } from './status.controller'

@Module({
  imports: [],
  controllers: [StatusController],
})
export class AppModule {}
