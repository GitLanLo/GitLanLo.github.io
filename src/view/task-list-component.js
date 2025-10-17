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
  constructor({status, statusLabel, onTaskDrop}) {
    super();
    this.status = status;
    this.statusLabel = statusLabel;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createColumnComponentTemplate({status: this.status, statusLabel: this.statusLabel});
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const newIndex  = this.#getDropIndex(container, event.clientY);
      onTaskDrop(taskId, this.status, newIndex);
    });
  }

  #getDropIndex(container, mouseY) {
    const items = [...container.querySelectorAll('.task:not(.dragging)')];
    if (items.length === 0) return 0;
    const idx = items.findIndex((container) => {
      const rect = container.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      return mouseY < mid;
    });
  return idx === -1 ? items.length : idx;
  }
}