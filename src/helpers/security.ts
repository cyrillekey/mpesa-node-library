import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export default function () {
  if (!this.certPath) throw new Error(`Error! Certificate path is required!`);
  if (!this.securityCredential) throw new Error(`Error! Operator password is required!`);
  const bufferToEncrypt = Buffer.from(this.securityCredential);
  const data = fs.readFileSync(path.resolve(this.certPath));
  const privateKey = String(data);
  const encrypted = crypto.publicEncrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    bufferToEncrypt
  );
  return encrypted.toString('base64');
}
