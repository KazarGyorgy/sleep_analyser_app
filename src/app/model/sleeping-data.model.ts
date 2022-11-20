export interface SleepingData {
  dateTimeOfMeasurement: Date;
  bloodOxygen: number;
  hr: number;
  ma3: number;
  ma5: number;
}

export interface ExtendedSleepingData {
  sleepingData: SleepingData[];
  minOxygen: number;
  maxOxygen: number;
  averageOxygen: number;
}
