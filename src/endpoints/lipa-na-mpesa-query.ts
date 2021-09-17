export interface ILipaNaMpesaQuery {
  checkoutRequestId: string;
  shortCode?: number;
  passKey?: string;
}
export default async function (opts: ILipaNaMpesaQuery): Promise<any> {
  const _shortCode = opts.shortCode || this.configs.lipaNaMpesaShortCode;
  const _passKey = opts.passKey || this.configs.lipaNaMpesaShortPass;
  const timeStamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3);
  const password = Buffer.from(`${_shortCode}${_passKey}${timeStamp}`).toString('base64');
  const req = await this.request();
  return req.post('/mpesa/stkpushquery/v1/query', {
    BusinessShortCode: _shortCode,
    Password: password,
    Timestamp: timeStamp,
    CheckoutRequestID: opts.checkoutRequestId,
  });
}
