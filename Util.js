export default class Utils {
  static getName(obj) {
    return obj.side + obj.type;
  }
  static toLocation(x, y) {
    return x + '' + y;
  }
  static isEmptyObj(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  static checkClassExist(location, className) {
    var element = document.getElementById(location);
    return element.classList.contains(className);
  }
}
