import { AxiosResponse } from 'axios';
import { ISTKPushResponse } from '..';

export interface ISTKPushArguments {
  senderMsisdn: number;
  amount: number;
  callbackUrl: string;
  accountRef: string;
  partyB: number;
  transactionDesc?: string;
  transactionType?: string;
  shortCode?: number;
  passKey?: string;
}

export default async function (opts: ISTKPushArguments): Promise<AxiosResponse<ISTKPushResponse>> {
  const _shortCode = opts.shortCode || this.configs.lipaNaMpesaShortCode;
  const _passKey = opts.passKey || this.configs.lipaNaMpesaShortPass;
  if (!_shortCode) throw new Error(`Error! Lipa Na M-Pesa shortcode is required!`);
  if (!_passKey) throw new Error(`Error! Lipa Na M-Pesa pass key is required!`);
  const timeStamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3);
  const password = Buffer.from(`${_shortCode}${_passKey}${timeStamp}`).toString('base64');
  const req = await this.request();
  return req.post('/mpesa/stkpush/v1/processrequest', {
    BusinessShortCode: _shortCode,
    Password: password,
    Timestamp: timeStamp,
    TransactionType: opts.transactionType || 'CustomerPayBillOnline',
    Amount: opts.amount,
    PartyA: opts.senderMsisdn,
    PartyB: opts.partyB,
    PhoneNumber: opts.senderMsisdn,
    CallBackURL: opts.callbackUrl,
    AccountReference: opts.accountRef,
    TransactionDesc: opts.transactionDesc || 'Lipa na mpesa online',
  });
}
