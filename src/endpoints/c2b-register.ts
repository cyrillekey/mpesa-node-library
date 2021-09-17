export interface IC2BRegister {
  confirmationUrl: string;
  validationUrl: string;
  shortCode?: number;
  responseType?: string;
}

export default async function (opts: IC2BRegister): Promise<any> {
  const req = await this.request();
  return req.post('/mpesa/c2b/v1/registerurl', {
    ShortCode: opts.shortCode || this.configs.shortCode,
    ResponseType: opts.responseType || 'Completed',
    ConfirmationURL: opts.confirmationUrl,
    ValidationURL: opts.validationUrl,
  });
}
