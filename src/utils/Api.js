export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    //this._authorization = config.headers.authorization;// token
  }

  getUserInfo() {
    return fetch(`${this._url}/clientData/509294090`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  editProfile(data) {
    console.log(data);
    return fetch(`${this._url}/clientData/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: data.clientId,
        clientName: data.clientName,
        clientGender: data.clientGender,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail,
      }),
    }).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
}
