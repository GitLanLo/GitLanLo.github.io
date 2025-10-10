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
  #clearButtonComponent = null;

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    render(this.#boardComponent, this.#boardContainer);
    const columnsContainer = this.#boardComponent.element;

    for (const status of Object.values(Status)) {
      this.#renderTasksList(status, columnsContainer);
    }
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #renderTasksList(status, container) {
  const columnComponent = new TaskListComponent({status, statusLabel: StatusLabel[status]});
  render(columnComponent, container);

  const tasksContainer = columnComponent.element.querySelector('.tasks-container');
  const tasksForStatus = this.tasks.filter(task => task.status === status);

  if (tasksForStatus.length === 0) {
    this.#renderNoTasks(tasksContainer);
  } else {
    tasksForStatus.forEach(task => this.#renderTask(task, tasksContainer));
  }

  if (status === Status.TRASH) {
    if (tasksForStatus.length > 0) {
      const clearButtonComponent = new ClearButtonComponent({
        onClick: () => {
          this.#tasksModel.clearTrash();
        }
      });
      render(clearButtonComponent, columnComponent.element);
    }
  }
}

  #renderClearButton(container) {
    const trashTasks = this.tasks.filter(task => task.status === Status.TRASH);

    if (trashTasks.length === 0) {
      if (this.#clearButtonComponent) {
        this.#clearButtonComponent.removeElement();
        this.#clearButtonComponent = null;
      }
      return;
    }

    if (!this.#clearButtonComponent) {
      this.#clearButtonComponent = new ClearButtonComponent({
        onClick: () => {
          this.#tasksModel.clearTrash();
        }
      });
      render(this.#clearButtonComponent, container);
    } else {
      this.#clearButtonComponent.enable();
    }
  }

  #renderNoTasks(container) {
    const noTaskComponent = new NoTaskComponent();
    render(noTaskComponent, container);
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({task});
    render(taskComponent, container);
  }

  #handleModelChange() {
    this.#clearBoard();
    const columnsContainer = this.#boardComponent.element;

    for (const status of Object.values(Status)) {
      this.#renderTasksList(status, columnsContainer);
    }

    if (this.#clearButtonComponent) {
      const hasTrash = this.tasks.some(task => task.status === Status.TRASH);
      hasTrash ? this.#clearButtonComponent.enable() : this.#clearButtonComponent.disable();
    }
  }

  #clearBoard() {
    this.#boardComponent.element.innerHTML = '';
  }

  createTask() {
    const taskInput = document.querySelector('#task-input');
    const taskTitle = taskInput.value.trim();
    if (!taskTitle) return;

    this.#tasksModel.addTask(taskTitle);
    taskInput.value = '';
  }
}
