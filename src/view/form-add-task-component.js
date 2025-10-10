import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<form id="task-form">
      <h2>Новая задача</h2>
      <div class="form-row">
        <input type="text" placeholder="Название задачи..." id="task-input" required>
        <button type="submit" id="add-btn">+ Добавить</button>
      </div>
    </form>`
      );
}


export default class FormAddTaskComponent extends AbstractComponent{
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
