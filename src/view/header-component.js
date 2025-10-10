import { AbstractComponent } from '../framework/view/abstract-component.js';


function createHeaderComponentTemplate() {
    return (
        `<header class="task-list__header">
          <div class="task-list__inner">
            <h1>Список задач</h1>
          </div>
        </header>`
      );
}


export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}
