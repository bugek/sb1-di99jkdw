export interface Milestone {
  processId: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
}

export interface Schedule {
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
}

export interface ScheduleResponse {
  productId: string;
  schedule: Schedule;
}