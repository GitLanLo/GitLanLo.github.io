const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};


function createElement(template) {
  const newElement = document.createElement('template');
  newElement.innerHTML = template.trim();
  return newElement.content.firstElementChild;
}


function render(component, container, place = RenderPosition.BEFOREEND) {
container.insertAdjacentElement(place, component.getElement());
}


export {RenderPosition, createElement, render};