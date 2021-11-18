import Utils from '../Util.js';
import View from '../View.js';

export default class Piece {
  _side = '';
  _type = '';
  _x = 0;
  _y = 0;
  _selected = 'false';
  _possibleMoves = [];
  _specialMove = 0;

  constructor(side, location) {
    this.setSide(side);
    this.setLocation(location);
  }

  getSide() {
    return this._side;
  }

  setSide(side) {
    this._side = side;
  }

  getType() {
    return this._type;
  }

  setType(type) {
    this._type = type;
  }

  getX() {
    return this._x;
  }

  setX(x) {
    this._x = x;
  }

  getY() {
    return this._y;
  }

  setY(y) {
    this._y = y;
  }

  move() {
    console.log('piece move');
  }

  getName() {
    return this.getType() + '--' + this.getSide();
  }

  setLocation(location) {
    this.setX(Number(location[0]));
    this.setY(Number(location[1]));
  }

  getLocation() {
    return Utils.toLocation(this.getX(), this.getY());
  }

  getPossibleMoves() {
    return this._possibleMoves;
  }

  pushPossibleMoves(x, y) {
    let move = Utils.toLocation(x, y);
    this._possibleMoves.push(move);
  }

  setSpecialMove(state) {
    this._specialMove = state;
  }

  getSpecialMove() {
    return this._specialMove;
  }

  remove() {
    View.removeDisplay(this.getName(), this.getLocation());
  }

  move(location) {
    this.remove();
    this.setLocation(location);
    View.display(this.getName(), this.getLocation());
  }

  moveHorizontally(x, y, limit) {
    if (limit) {
      if (y + 1 < this.boardSize) {
        this.pushPossibleMoves(x, y + 1);
      }
      if (y - 1 >= 0) {
        this.pushPossibleMoves(x, y - 1);
      }
    } else {
      for (let i = y + 1; i < this.boardSize; i++) {
        if (!this.parseCell(x, y, x, i)) break;
      }
      for (let i = y - 1; i >= 0; i--) {
        if (!this.parseCell(x, y, x, i)) break;
      }
    }
  }

  removePossibleMoves() {
    this._possibleMoves = [];
  }
}
