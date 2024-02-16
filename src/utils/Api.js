export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/clientData/509294090`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  editProfile(data) {
    return fetch(`${this._url}/clientData/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this._handleResponseCommon);
  }


  getAllRegions() {
    return fetch(`${this._url}/region/`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }


  getAllSalonsInRegion(regionId) {
    return fetch(`${this._url}/salonData/region/${regionId}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }


  getSalonInfo(salonId) {
    return fetch(`${this._url}/salonData/${salonId}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }


  getReviews(salonId) {
    return fetch(`${this._url}/review/salon/${salonId}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }


  getProcedureInfo(salonId) {
    return fetch(`${this._url}/procedure/salon/${salonId}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getAllCategoriesOfProcedures() {
    return fetch(`${this._url}/procedure/all`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }


  getVersion() {
    return fetch(`${this._url}/service/version`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponseCommon);
  }


  //-------------------------------------------------------response-----------------------------------------------------------//
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
