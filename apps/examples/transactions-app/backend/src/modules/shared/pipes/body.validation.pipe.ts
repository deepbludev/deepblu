import { ZodSchema } from 'zod'
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class BodyValidationPipe implements PipeTransform {
  private constructor(private schema: ZodSchema) {}

  transform(body: unknown) {
    const result = this.schema.safeParse(body)
    if (!result.success) {
      const message = `Validation failed: ${result.error.issues
        .map(issue => issue.message)
        .join('. ')}`
      throw new BadRequestException(message)
    }

    return body
  }

  static with(schema: ZodSchema) {
    return new BodyValidationPipe(schema)
  }
}
