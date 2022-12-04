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
  rem: number;
  light: number;
  deep: number;
  lengthOfSleep: number;
  rating: number;
  ratingMessage: string;
}
