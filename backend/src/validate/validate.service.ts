import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateService {
  validateLength(value: string, maxLength: number, minLength: number): boolean {
    return value.trim().length <= maxLength && value.trim().length >= minLength;
  }
}
