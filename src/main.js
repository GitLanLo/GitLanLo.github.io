import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import BoardComponent from './view/task-board-component.js';
import ColumnComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';

const innerContainer = document.querySelector('.task-list__inner');
const taskFormContainer = document.querySelector('.task-form');
const boardContainer = document.querySelector('.board');

const headerComponent = new HeaderComponent();
render(headerComponent, innerContainer, RenderPosition.AFTERBEGIN);

const formComponent = new FormAddTaskComponent();
render(formComponent, taskFormContainer);

const boardComponent = new BoardComponent();
render(boardComponent, boardContainer);

const columnsContainer = boardComponent.getElement();  

for (let i = 0; i < 4; i++) {
  const columnComponent = new ColumnComponent();
  render(columnComponent, columnsContainer);
  const tasksContainer = columnComponent.getElement().querySelector('.tasks-container');
  for (let j = 0; j < 4; j++) {
    const taskComponent = new TaskComponent();
    render(taskComponent, tasksContainer);
  }
}