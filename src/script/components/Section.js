export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer(item) {
    const element = this._renderer(item);

    this.addItem(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
