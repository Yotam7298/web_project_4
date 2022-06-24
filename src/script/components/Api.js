export default class Api {
  constructor(options) {
    this._options = options;
  }

  _verifyResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Something went wrong, Error: ${res.status}`);
  }

  _logInfo(res) {
    console.log("Request was successful:");
    console.log(res);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  loadCards(userId) {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((cardsArray) => {
        return { array: cardsArray, id: userId };
      })
      .catch((err) => console.log(err));
  }

  editProfileInfo(userNewInfo) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: userNewInfo.name,
        about: userNewInfo.about,
      }),
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  editProfilePicture(avatarUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatarUrl.avatar,
      }),
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        this._logInfo(res);
        return res;
      })
      .catch((err) => console.log(err));
  }

  addNewCard(cardNewInfo) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: cardNewInfo.title,
        link: cardNewInfo.link,
      }),
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        this._logInfo(res);
      })
      .catch((err) => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        this._logInfo(res);
      })
      .catch((err) => console.log(err));
  }

  changeCardLike(cardId, method) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this._options.headers,
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        this._logInfo(res);
        return res;
      })
      .catch((err) => console.log(err));
  }
}
