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
    console.log("api.js", data);
    return fetch(`${this._url}/clientData/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // body: JSON.stringify({
      //   clientId: data.clientId,
      //   clientName: data.clientName,
      //   clientEmail: data.clientEmail,
      //   clientPhone: data.clientPhone,
      //   clientGender: data.clientGender
      // }),
    }).then(this._handleResponseCommon);
  }

  getVersion() {
    return fetch(`${this._url}/service/version`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponseCommon);
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
    } 
    else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  _handleResponseCommon(res) {
    switch (res.status) {
      case 200: // OK
      // return res;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        } else {
          return res.text();
        }
      case 400:
        return Promise.reject('Bad Request'); // Not Found
      case 404: // Not Found
        return Promise.reject('Page not found');
      case 500: // Internal Server Error
        return Promise.reject('Internal Server Error');
      default:
        return Promise.reject(`Ошибка ${res.status}`);
    }
  }
}
