import {render} from '../framework/render.js';
import BoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import NoTaskComponent from '../view/no-task-component.js';
import {Status, StatusLabel} from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #boardComponent = new BoardComponent();
  #boardTasks = [];

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];

    render(this.#boardComponent, this.#boardContainer);
    const columnsContainer = this.#boardComponent.element;

    for (const status of Object.values(Status)) {
      this.#renderTasksList(status, columnsContainer);
    }
  }

  #renderTasksList(status, container) {
    const columnComponent = new TaskListComponent({status: status, statusLabel: StatusLabel[status]});
    render(columnComponent, container);

    const tasksContainer = columnComponent.element.querySelector('.tasks-container');

    if (status === Status.TRASH) {
      this.#renderClearButton(columnComponent.element);
    }

    const tasksForStatus = this.#boardTasks.filter((task) => task.status === status);

    if (tasksForStatus.length === 0) {
      this.#renderNoTasks(tasksContainer);
    } else {
      tasksForStatus.forEach((task) => {
        this.#renderTask(task, tasksContainer);
      });
    }
  }

  #renderClearButton(container) {
    const clearButtonComponent = new ClearButtonComponent();
    render(clearButtonComponent, container);
  }

  #renderNoTasks(container) {
    const noTaskComponent = new NoTaskComponent();
    render(noTaskComponent, container);
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({task});
    render(taskComponent, container);
  }
}