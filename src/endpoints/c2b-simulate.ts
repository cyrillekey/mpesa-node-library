import { AxiosResponse } from 'axios';

export interface IC2BSimulate {
  msisdn: number;
  amount: number;
  billRefNumber: string;
  commandId?: string;
  shortCode?: number;
}

export default async function (opts: IC2BSimulate): Promise<AxiosResponse<any>> {
  const req = await this.request();
  return req.post('/mpesa/c2b/v1/simulate', {
    ShortCode: opts.shortCode || this.configs.shortCode,
    CommandID: opts.commandId || 'CustomerPayBillOnline',
    Amount: opts.amount,
    Msisdn: opts.msisdn,
    BillRefNumber: opts.billRefNumber,
  });
}
