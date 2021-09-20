import { AxiosResponse } from 'axios';

export interface IAccountBalance {
  shortCode: number;
  idType: number;
  queueUrl: string;
  resultUrl: string;
  remarks?: string;
  initiator?: string;
  commandId?: string;
}

export default async function accountBalance(opts: IAccountBalance): Promise<AxiosResponse<any>> {
  const securityCredential = this.security();
  const req = await this.request();
  return req.post('/mpesa/accountbalance/v1/query', {
    Initiator: opts.initiator || this.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: opts.commandId || 'AccountBalance',
    PartyA: opts.shortCode,
    IdentifierType: opts.idType,
    Remarks: opts.remarks || 'Checking account balance',
    QueueTimeOutURL: opts.queueUrl,
    ResultURL: opts.resultUrl,
  });
}
