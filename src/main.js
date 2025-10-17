import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import { generateID } from './utils.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://68f27eabb36f9750deecd33e.mockapi.io'; 
const innerContainer = document.querySelector('.task-list__inner');
const taskFormContainer = document.querySelector('.task-form');
const boardContainer = document.querySelector('.board');

const tasksModel = new TasksModel ({ tasksApiService: new TasksApiService (END_POINT)}); 

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
  tasksModel: tasksModel
});
tasksBoardPresenter.init();