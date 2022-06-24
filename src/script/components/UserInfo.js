export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.about = this._userAbout.textContent;
    return userInfo;
  }

  setUserInfo(newUserParameters) {
    this._userName.textContent = newUserParameters.name;
    this._userAbout.textContent = newUserParameters.about;
  }

  setUserAvatar(newUserAvatar) {
    this._userAvatar.src = newUserAvatar;
  }
}
