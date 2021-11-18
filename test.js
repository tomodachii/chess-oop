import Controller from './Controller.js';

window.onload = () => {
  let controller = new Controller();
  //   console.log(controller.model.getBoard());

  let elementsArray = document.querySelectorAll('td');
  elementsArray.forEach(function (elem) {
    elem.addEventListener('click', function (eventObj) {
      let cell = eventObj.target;
      let location = cell.id;
      controller.handleClick(location);
    });
  });
};
