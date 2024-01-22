
import { baseUrl } from "./constants";

class ApiAuth {
    constructor( baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    }
  
    async _request(url, options) {
      const res = await fetch(url, options);
      return this._checkResponse(res);
    }
  
    checkToken(token) {
      return this._request(`${this.baseUrl}/users/me`, {
        headers: { ...this.headers, Authorization: `Bearer ${token}` },
      });
    }
  
    signup({ email, password }) {
      return this._request(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });
    }
  
    signin({ email, password }) {
      return this._request(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });
    }
  }
  
  export const apiAuth = new ApiAuth(baseUrl);

  