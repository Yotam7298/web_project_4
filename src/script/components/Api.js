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
    //   .finally(() => console.log("getUserInfo is done"));
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((cardsArray) => {
        return cardsArray;
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log("Request was successful");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProfilePicture(avatarUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(avatarUrl),
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        console.log("Request was successful");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(cardNewInfo) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: cardNewInfo.name,
        link: cardNewInfo.link,
      }),
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        console.log("Request was successful");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log("Request was successful");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCardLikes(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      headers: this._options.headers,
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCardLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: PUT,
      headers: this._options.headers,
      body: JSON.stringify(),
    });
  }

  removeCardLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: DELETE,
      headers: this._options.headers,
    })
      .then((res) => {
        return this._verifyResponse(res);
      })
      .then((res) => {
        console.log("Request was successful");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
