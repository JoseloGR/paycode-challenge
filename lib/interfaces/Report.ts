export interface IReportInner {
  averageTicket?: number;
  topTicket?: number;
  topPaymentMethod?: string;
  revenuePerHour?: number[];
}

export interface IReport {
  averageTicket?: number;
  topTicket?: number;
  topPaymentMethod?: string;
  revenuePerHour?: number[];
  previousDay?: IReportInner;
}
