import supertest from 'supertest'
// import { Connection } from 'typeorm'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app/app.module'
import { TestLogger } from './test-logger'

export class TestEnvironment {
  // public readonly db: Connection

  private constructor(
    public readonly app: INestApplication,
    public readonly module: TestingModule
  ) {
    // this.db = app.get(Connection)
  }

  static async init() {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = module.createNestApplication()
    const env = new TestEnvironment(app, module)

    await env.app.init()
    // if (process.env.NODE_ENV === 'test') await env.db.synchronize(true)

    return env
  }

  request() {
    return supertest(this.app.getHttpServer())
  }

  close() {
    return Promise.all([
      this.app.close(),
      // this.db.close()
    ])
  }

  public logger: TestLogger = new TestLogger()

  useLogger(logger?: TestLogger) {
    this.logger = logger || this.logger || new TestLogger()
    this.app.useLogger(this.logger)
    return this
  }
}
