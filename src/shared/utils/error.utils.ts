import { NotFoundException, BadRequestException } from '@nestjs/common';

export class EntityNotFoundError extends NotFoundException {
  constructor(entityName: string, id: string) {
    super(`${entityName} with ID ${id} not found`);
  }
}

export class InvalidEntityError extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

export function throwIfNotFound<T>(
  result: T | null | undefined,
  entityName: string,
  id: string
): T {
  if (!result) {
    throw new EntityNotFoundError(entityName, id);
  }
  return result;
}

export function throwIfInvalid(condition: boolean, message: string): void {
  if (!condition) {
    throw new InvalidEntityError(message);
  }
}