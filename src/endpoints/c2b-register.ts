import { AxiosResponse } from 'axios';

export interface IC2BRegister {
  confirmationUrl: string;
  validationUrl: string;
  shortCode?: number;
  responseType?: string;
}

export default async function (opts: IC2BRegister): Promise<AxiosResponse<any>> {
  const req = await this.request();
  return req.post('/mpesa/c2b/v2/registerurl', {
    ShortCode: opts.shortCode || this.configs.shortCode,
    ResponseType: opts.responseType || 'Completed',
    ConfirmationURL: opts.confirmationUrl,
    ValidationURL: opts.validationUrl,
  });
}
