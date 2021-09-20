import { AxiosResponse } from 'axios';

export interface IB2BArguments {
  senderParty: number;
  receiverParty: number;
  amount: number;
  queueUrl: string;
  resultUrl: string;
  senderType?: number;
  receiverType?: number;
  initiator?: string;
  commandId?: string;
  accountRef?: string;
  remarks?: string;
}

export default async function (opts: IB2BArguments): Promise<AxiosResponse<any>> {
  const req = await this.request();
  const securityCredential = this.security();
  return req.post('/mpesa/b2b/v1/paymentrequest', {
    Initiator: opts.initiator || this.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: opts.commandId || 'BusinessToBusinessTransfer',
    SenderIdentifierType: opts.senderType || 4,
    RecieverIdentifierType: opts.receiverType || 4,
    Amount: opts.amount,
    PartyA: opts.senderParty,
    PartyB: opts.receiverParty,
    AccountReference: opts.accountRef,
    Remarks: opts.remarks || 'B2B Request',
    QueueTimeOutURL: opts.queueUrl,
    ResultURL: opts.resultUrl,
  });
}
