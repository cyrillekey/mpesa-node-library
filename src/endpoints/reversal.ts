export interface IReversal {
  transactionId: string;
  amount: number;
  queueUrl: string;
  resultUrl: string;
  shortCode?: string;
  remarks?: string;
  occasion?: string;
  initiator?: string;
  receiverIdType?: string;
  commandId?: string;
}

export default async function (opts: IReversal): Promise<any> {
  const securityCredential = this.security();
  const req = await this.request();
  return req.post('/mpesa/reversal/v1/request', {
    Initiator: opts.initiator || this.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: opts.commandId || 'TransactionReversal',
    TransactionID: opts.transactionId,
    Amount: opts.amount,
    ReceiverParty: opts.shortCode || this.configs.shortCode,
    RecieverIdentifierType: opts.receiverIdType || '11',
    ResultURL: opts.resultUrl,
    QueueTimeOutURL: opts.queueUrl,
    Remarks: opts.remarks || 'Reversal',
    Occasion: opts.occasion || 'Reversal',
  });
}
