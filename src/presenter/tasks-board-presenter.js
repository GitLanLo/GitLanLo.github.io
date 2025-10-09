import {render} from '../framework/render.js';
import BoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import {Status, StatusLabel} from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #boardComponent = new BoardComponent();
  #boardTasks = [];

  constructor({boardContainer, taskModel}) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
  }

  init() {
    this.#boardTasks = [...this.#taskModel.tasks];

    render(this.#boardComponent, this.#boardContainer);
    const columnsContainer = this.#boardComponent.element;

    for (const status of Object.values(Status)) {
      const columnComponent = new TaskListComponent({status: status, statusLabel: StatusLabel[status]});
      render(columnComponent, columnsContainer);

      const tasksContainer = columnComponent.element.querySelector('.tasks-container');

      if (status === Status.TRASH) {
        const clearButtonComponent = new ClearButtonComponent();
        render(clearButtonComponent, columnComponent.element);
      }

      const tasksForStatus = this.#boardTasks.filter((task) => task.status === status);

      tasksForStatus.forEach((task) => {
        const taskComponent = new TaskComponent({task});
        render(taskComponent, tasksContainer);
      });
    }
  }
}