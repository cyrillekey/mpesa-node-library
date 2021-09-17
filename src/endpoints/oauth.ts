import axios from 'axios';
export default function (consumerKey: string, consumerSecret: string, baseURL = null) {
  const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
  return axios.get((baseURL || this.baseURL) + '/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      Authorization: 'Basic ' + auth,
      'content-type': 'application/json',
    },
  });
}
