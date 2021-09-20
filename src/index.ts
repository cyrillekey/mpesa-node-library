import { AxiosInstance } from 'axios';
import { accountBalance, b2b, b2c, c2bRegister, c2bSimulate, lipaNaMpesaOnline, lipaNaMpesaQuery, oAuth, reversal, transactionStatus } from './endpoints';
import { IAccountBalance } from './endpoints/account-balance';
import { IB2BArguments } from './endpoints/b2b';
import { IB2CArguments } from './endpoints/b2c';
import { IC2BRegister } from './endpoints/c2b-register';
import { IC2BSimulate } from './endpoints/c2b-simulate';
import { ISTKPushArguments } from './endpoints/lipa-na-mpesa-online';
import { ILipaNaMpesaQuery } from './endpoints/lipa-na-mpesa-query';
import { IReversal } from './endpoints/reversal';
import { ITransactionStatus } from './endpoints/transaction-status';
import { request, security } from './helpers';

type MpesaEnvironment = 'production' | 'sandbox';
export interface IB2CResponse {
  ConversationID: string;
  OriginatorConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
}

export interface ISTKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}
export interface ISTKPushResultPayload {
  Body: {
    stkCallback: {
      ResultCode: number;
      ResultDesc: string;
      MerchantRequestID: string;
      CheckoutRequestID: string;
    };
    CallbackMetadata: {
      Item: {
        Name: 'Amount' | 'MpesaReceiptNumber' | 'PhoneNumber';
        Value: number | string;
      }[];
    };
  };
}

interface IMpesaConfigs {
  consumerKey: string;
  consumerSecret: string;
  environment?: MpesaEnvironment;
  shortCode?: number;
  initiatorName?: string;
  lipaNaMpesaShortCode?: number;
  lipaNaMpesaShortPass?: string;
  securityCredential?: string;
  certPath?: string;
}

/**
 * Class representing the Mpesa instance
 */
class Mpesa {
  private configs: any;
  private security: string;
  private request: AxiosInstance;
  private baseURL: string;
  private environment: MpesaEnvironment;
  private shortCode: number;
  private initiatorName: string;
  private lipaNaMpesaShortCode: number;
  private lipaNaMpesaShortPass: string;
  private securityCredential: string;
  private certPath: string;
  constructor(config: IMpesaConfigs) {
    if (!config.consumerKey) throw new Error('Consumer Key is Missing');
    if (!config.consumerSecret) throw new Error('Consumer Secret is Missing');
    this.configs = { ...config };
    this.environment = config.environment === 'production' ? 'production' : 'sandbox';
    this.request = request.bind(this) as any;
    this.baseURL = `https://${this.environment === 'production' ? 'api' : 'sandbox'}.safaricom.co.ke`;
    this.shortCode = config.shortCode;
    this.initiatorName = config.initiatorName;
    this.lipaNaMpesaShortCode = config.lipaNaMpesaShortCode;
    this.lipaNaMpesaShortPass = config.lipaNaMpesaShortPass;
    this.securityCredential = config.securityCredential;
    this.certPath = config.certPath;
  }
  accountBalance(opts: IAccountBalance) {
    return accountBalance.bind(this)(opts);
  }
  b2b(opts: IB2BArguments) {
    return b2b.bind(this)(opts);
  }
  b2c(opts: IB2CArguments) {
    this.security = security(this.configs.certPath, this.configs.securityCredential);
    return b2c.bind(this)(opts);
  }
  c2bRegister(opts: IC2BRegister) {
    return c2bRegister.bind(this)(opts);
  }
  c2bSimulate(opts?: IC2BSimulate) {
    if (this.environment === 'production') {
      throw new Error('Cannot call C2B simulate in production.');
    }
    return c2bSimulate.bind(this)(opts);
  }
  lipaNaMpesaOnline(opts: ISTKPushArguments) {
    return lipaNaMpesaOnline.bind(this)(opts);
  }
  lipaNaMpesaQuery(opts: ILipaNaMpesaQuery) {
    return lipaNaMpesaQuery.bind(this)(opts);
  }
  private oAuth() {
    const { consumerKey, consumerSecret } = this.configs;
    return oAuth.bind(this)(consumerKey, consumerSecret);
  }
  reversal(opts: IReversal) {
    return reversal.bind(this)(opts);
  }
  transactionStatus(opts: ITransactionStatus) {
    return transactionStatus.bind(this)(opts);
  }
}

export default Mpesa;
