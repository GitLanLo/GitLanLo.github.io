import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';

const innerContainer = document.querySelector('.task-list__inner');
const taskFormContainer = document.querySelector('.task-form');
const boardContainer = document.querySelector('.board');

const taskModel = new TaskModel();

const headerComponent = new HeaderComponent();
render(headerComponent, innerContainer, RenderPosition.AFTERBEGIN);

const formComponent = new FormAddTaskComponent();
render(formComponent, taskFormContainer);

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: boardContainer,
  taskModel: taskModel
});
tasksBoardPresenter.init();