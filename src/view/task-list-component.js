import {createElement} from '../framework/render.js';

function createColumnComponentTemplate({status, statusLabel}) {
  return `
    <div class="column" data-status="${status}">
      <h3>${statusLabel}</h3>
      <div class="tasks-container"></div>
    </div>
  `;
}

export default class TaskListComponent {
  constructor({status, statusLabel}) {
    this.status = status;
    this.statusLabel = statusLabel;
  }

  getTemplate() {
    return createColumnComponentTemplate({status: this.status, statusLabel: this.statusLabel});
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