export const PROCESS_CONSTANTS = {
  STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
  } as const,
  MIN_DURATION: 0,
  MAX_DURATION: 365, // days
} as const;

export type ProcessStatusType = typeof PROCESS_CONSTANTS.STATUS[keyof typeof PROCESS_CONSTANTS.STATUS];