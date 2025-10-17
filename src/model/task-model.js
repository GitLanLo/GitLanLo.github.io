import Observable from '../framework/observable.js';
import { UserAction, UpdateType, Status } from '../const.js';
import { generateID } from '../utils.js';

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;

    this.#tasksApiService.tasks.then((tasks) => {
     console.log(tasks);
   });


  }

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: Status.BACKLOG, // 'backlog'
      id: generateID(),
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((t) => String(t.id) === String(taskId));
    if (!task) return;

    const previousStatus = task.status;
    task.status = newStatus;

    try {
      const updatedTask = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updatedTask);
      this._notify(UserAction.UPDATE_TASK, task);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи на сервере:', err);
      task.status = previousStatus;
      throw err;
    }
  }

  async clearTrash() {
    const trashTasks = this.#boardtasks.filter((t) => t.status === Status.TRASH);
    try {
      await Promise.all(trashTasks.map((t) => this.#tasksApiService.deleteTask(t.id)));
      this.#boardtasks = this.#boardtasks.filter((t) => t.status !== Status.TRASH);
      this._notify(UserAction.DELETE_TASK, { status: Status.TRASH });
    } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервере:', err);
      throw err;
    }
  }

  hasTrashTasks() {
    return this.#boardtasks.some((t) => t.status === Status.TRASH);
  }
}
