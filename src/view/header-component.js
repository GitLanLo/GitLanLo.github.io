import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `<header class="task-list__header">
          <div class="task-list__inner">
            <h1>Список задач</h1>
          </div>
        </header>`
      );
}


export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
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
