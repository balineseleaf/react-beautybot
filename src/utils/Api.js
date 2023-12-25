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
    //console.log("api.js", data);
    return fetch(`${this._url}/clientData/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this._handleResponseWithoutJSON);
  }

  getVersion() {
    return fetch(`${this._url}/service/version`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponseText);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
  _handleResponseWithoutJSON(res) {
    if (res.ok) {
      return res;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
  _handleResponseText(res) {
    if (res.ok) {
      return res.text();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
}
