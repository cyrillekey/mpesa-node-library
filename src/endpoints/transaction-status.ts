import { AxiosResponse } from 'axios';

export interface ITransactionStatus {
  transactionId: string;
  receiverParty: number;
  idType: number;
  queueUrl: string;
  resultUrl: string;
  remarks?: string;
  occasion?: string;
  initiator?: string;
  commandId?: string;
}

export default async function (opts: ITransactionStatus): Promise<AxiosResponse<any>> {
  const securityCredential = this.security();
  const req = await this.request();
  return req.post('/mpesa/transactionstatus/v1/query', {
    Initiator: opts.initiator || this.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: opts.commandId || 'TransactionStatusQuery',
    TransactionID: opts.transactionId,
    PartyA: opts.receiverParty,
    IdentifierType: opts.idType,
    ResultURL: opts.resultUrl,
    QueueTimeOutURL: opts.queueUrl,
    Remarks: opts.remarks || 'TransactionReversal',
    Occasion: opts.occasion || 'TransactionReversal',
  });
}
