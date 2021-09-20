import { AxiosResponse } from 'axios';

export interface IB2CArguments {
  senderParty: number;
  receiverParty: number;
  amount: number;
  queueUrl: string;
  resultUrl: string;
  commandId?: string;
  initiatorName: string;
  remarks?: string;
  occasion?: string;
}
export interface IB2CResponse {
  ConversationID: string;
  OriginatorConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
}

export default async function (opts: IB2CArguments): Promise<AxiosResponse<IB2CResponse>> {
  const securityCredential = this.security();
  const req = await this.request();
  return req.post('/mpesa/b2c/v1/paymentrequest', {
    InitiatorName: opts.initiatorName || this.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: opts.commandId || 'BusinessPayment',
    Amount: opts.amount,
    PartyA: opts.senderParty,
    PartyB: opts.receiverParty,
    Remarks: opts.remarks || 'B2C Payment',
    QueueTimeOutURL: opts.queueUrl,
    ResultURL: opts.resultUrl,
    Occasion: opts.occasion || 'SalaryPayment',
  });
}
