import {mockTasks} from '../mock/task.js';

export default class TaskModel {
  #tasks = mockTasks;

  get tasks() {
    return this.#tasks;
  }
}
