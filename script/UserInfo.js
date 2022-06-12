export default class UserInfo {
  constructor(userNameSelector, userTitleSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userTitle = document.querySelector(userTitleSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.title = this._userTitle.textContent;
    return userInfo;
  }

  setUserInfo(newUserName, newUserTitle) {
    this._userName.textContent = newUserName;
    this._userTitle.textContent = newUserTitle;
  }
}
