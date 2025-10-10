import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import { generateID } from './utils.js';

const innerContainer = document.querySelector('.task-list__inner');
const taskFormContainer = document.querySelector('.task-form');
const boardContainer = document.querySelector('.board');

const taskModel = new TaskModel();

const headerComponent = new HeaderComponent();
render(headerComponent, innerContainer, RenderPosition.AFTERBEGIN);

const formComponent = new FormAddTaskComponent({
  onClick: handleNewTaskFormClick
});
function handleNewTaskFormClick() {
  tasksBoardPresenter.createTask();
}
render(formComponent, taskFormContainer);

formComponent.element.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const input = formComponent.element.querySelector('#task-input');
  const title = input.value.trim();

  if (title) {
    taskModel.addTask({
      id: generateID(),
      title,
      status: 'backlog'
  });

  input.value = '';
  }
});

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: boardContainer,
  tasksModel: taskModel
});
tasksBoardPresenter.init();