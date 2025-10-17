import { render } from '../framework/render.js';
import BoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import NoTaskComponent from '../view/no-task-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #boardComponent = new BoardComponent();
  #clearButtonComponent = null;
  #loadingComponent = new LoadingViewComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    // подписка на события модели
    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  // показываем загрузку и ждём init модели
  async init() {
    render(this.#boardComponent, this.#boardContainer);
    render(this.#loadingComponent, this.#boardComponent.element);
    await this.#tasksModel.init();
  }

  // обработчик событий модели (наблюдатель)
  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UpdateType.INIT:
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        if (this.#clearButtonComponent) {
          this.#clearButtonComponent[
            this.#tasksModel.hasTrashTasks() ? 'enable' : 'disable'
          ]();
        }
        break;
      default:
        break;
    }
  };

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #renderBoard() {
    const columnsContainer = this.#boardComponent.element;

    for (const status of Object.values(Status)) {
      this.#renderTasksList(status, columnsContainer);
    }
  }

  #renderTasksList(status, container) {
    const columnComponent = new TaskListComponent({
      status,
      statusLabel: StatusLabel[status],
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    render(columnComponent, this.#boardComponent.element);

    const tasksContainer = columnComponent.element.querySelector('.tasks-container');
    const tasksForStatus = this.tasks.filter((task) => task.status === status);

    if (tasksForStatus.length === 0) {
      this.#renderNoTasks(tasksContainer);
    } else {
      tasksForStatus.forEach((task) => this.#renderTask(task, tasksContainer));
    }

    if (status === Status.TRASH) {
      if (tasksForStatus.length > 0) {
        this.#clearButtonComponent = new ClearButtonComponent({
          onClick: () => {
            this.#tasksModel.clearTrash();
          },
        });
        render(this.#clearButtonComponent, columnComponent.element);
      }
    }
  }

  #renderNoTasks(container) {
    const noTaskComponent = new NoTaskComponent();
    render(noTaskComponent, container);
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  #handleTaskDrop(taskId, newStatus /*, newIndex */) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
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