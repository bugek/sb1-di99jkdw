import { Document } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export async function findOneOrThrow<T extends Document>(
  promise: Promise<T | null>,
  id: string,
  entityName: string
): Promise<T> {
  const result = await promise;
  if (!result) {
    throw new NotFoundException(`${entityName} with ID ${id} not found`);
  }
  return result;
}

export async function updateOneOrThrow<T extends Document>(
  promise: Promise<T | null>,
  id: string,
  entityName: string
): Promise<T> {
  const result = await promise;
  if (!result) {
    throw new NotFoundException(`${entityName} with ID ${id} not found`);
  }
  return result;
}

export async function deleteOneOrThrow<T extends Document>(
  promise: Promise<T | null>,
  id: string,
  entityName: string
): Promise<T> {
  const result = await promise;
  if (!result) {
    throw new NotFoundException(`${entityName} with ID ${id} not found`);
  }
  return result;
}

export async function findManyOrEmpty<T extends Document>(
  promise: Promise<T[]>
): Promise<T[]> {
  const results = await promise;
  return results || [];
}