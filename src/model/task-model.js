import { Status } from '../const.js';
import { generateID } from '../utils.js';
import { mockTasks } from '../mock/task.js';

export default class TaskModel {
  #observers = [];
  #tasks = mockTasks;

  get tasks() {
    return this.#tasks;
  }

  getTasksByStatus(status) {
    return this.#tasks.filter((task) => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID()
    };
    this.#tasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }
  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }

  clearTrash() {
    this.#tasks = this.#tasks.filter((task) => task.status !== Status.TRASH);
    this._notifyObservers();
  }
}