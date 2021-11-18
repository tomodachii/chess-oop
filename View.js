export default class View {
  static display(name, location) {
    let cell = document.getElementById(location);
    cell.classList.add(name);
  }
  static removeDisplay(name, location) {
    let cell = document.getElementById(location);
    cell.classList.remove(name);
  }
  static repeatDisplay(name, locationArr) {
    for (let i = 0; i < locationArr.length; i++) {
      this.display(name, locationArr[i]);
    }
  }
  static repeatRemoveDisplay(name, locationArr) {
    for (let i = 0; i < locationArr.length; i++) {
      this.removeDisplay(name, locationArr[i]);
    }
  }
}
