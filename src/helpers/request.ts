import Axios from 'axios';
export default async function (_baseURL?: string) {
  const credentials = await this.oAuth();
  const instance = Axios.create({
    baseURL: _baseURL || this.baseURL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + credentials.data['access_token'],
      'Content-Type': 'application/json',
    },
  });
  return instance;
}
