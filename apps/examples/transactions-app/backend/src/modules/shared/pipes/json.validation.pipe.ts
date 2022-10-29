import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class JsonValidationPipe implements PipeTransform {
  transform(value: string) {
    try {
      JSON.parse(value)
    } catch (error) {
      throw new BadRequestException('Request body should be in JSON format.')
    }
    return value
  }
}
