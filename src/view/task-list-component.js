import { AbstractComponent } from '../framework/view/abstract-component.js';

function createColumnComponentTemplate({status, statusLabel}) {
  return `
    <div class="column" data-status="${status}">
      <h3>${statusLabel}</h3>
      <div class="tasks-container"></div>
    </div>
  `;
}

export default class TaskListComponent extends AbstractComponent{
  constructor({status, statusLabel}) {
    super();
    this.status = status;
    this.statusLabel = statusLabel;
  }

  get template() {
    return createColumnComponentTemplate({status: this.status, statusLabel: this.statusLabel});
  }
}