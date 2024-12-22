import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && value > 0;
  }

  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}