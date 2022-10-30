/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from 'zod'
import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common'

@Injectable()
export class BodyValidationPipe implements PipeTransform {
  private constructor(private schema: ZodSchema) {}

  transform(body: unknown): unknown {
    const result = this.schema.safeParse(body)

    if (result.success) return result.data

    const message = result.error.errors
      .map(error => `${error.path.join('.')}: ${error.message}`)
      .join(', ')

    throw new UnprocessableEntityException(
      `Input validation failed - ${message}`
    )
  }

  static with(schema: ZodSchema) {
    return new BodyValidationPipe(schema)
  }
}
