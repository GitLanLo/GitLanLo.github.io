import {createElement} from '../framework/render.js';

function createColumnComponentTemplate() {
  return `
    <div class="column">
      <h3>Название блока</h3>
      <div class="tasks-container"></div>
    </div>
  `;
}

export default class ColumnComponent {
  getTemplate() {
    return createColumnComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}