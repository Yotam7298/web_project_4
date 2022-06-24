export default class Section {
  constructor({ renderer, modifier }, containerSelector) {
    this._renderer = renderer;
    this._modifier = modifier;
    this._container = document.querySelector(containerSelector);
  }

  renderer(properties) {
    properties.array
      .slice()
      .reverse()
      .forEach((item) => {
        const element = this._renderer(item);

        this._modifier(element, properties.id);

        this.addItem(element);
      });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
