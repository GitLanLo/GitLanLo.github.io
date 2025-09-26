import {createElement} from '../framework/render.js'; 

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


export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
