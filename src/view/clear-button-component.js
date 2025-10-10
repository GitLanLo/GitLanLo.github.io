import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate() {
  return `<button class="clear-btn">Очистить</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#handleClick);
  }

  get template() {
    return createClearButtonTemplate();
  }

  disable() {
    this.element.disabled = true;
  }

  enable() {
    this.element.disabled = false;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}