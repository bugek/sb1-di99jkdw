export const PRODUCT_CONSTANTS = {
  STATUS: {
    PLANNED: 'planned',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
  },
  MIN_QUANTITY: 1,
  MIN_PRIORITY: 1,
  MAX_PRIORITY: 10,
} as const;

export type ProductStatus = typeof PRODUCT_CONSTANTS.STATUS[keyof typeof PRODUCT_CONSTANTS.STATUS];