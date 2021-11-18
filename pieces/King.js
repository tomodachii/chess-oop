import Piece from './Piece.js';
import View from '../View.js';

export default class King extends Piece {
  constructor(side, location) {
    super(side, location);
    this.setType('king');
    View.display(this.getName(), this.getLocation());
  }

  findPossibleMoves(boardSize) {
    //horizontally
    let x = this.getX();
    let y = this.getY();
    if (y + 1 < boardSize) {
      this.pushPossibleMoves(x, y + 1);
    }
    if (y - 1 >= 0) {
      this.pushPossibleMoves(x, y - 1);
    }
    //vertically
    if (x + 1 < boardSize) {
      this.pushPossibleMoves(x + 1, y);
    }
    if (x - 1 >= 0) {
      this.pushPossibleMoves(x - 1, y);
    }
    //diagonally
    if (x + 1 < boardSize && y + 1 < boardSize) {
      this.pushPossibleMoves(x + 1, y + 1);
    }
    if (x + 1 < boardSize && y - 1 >= 0) {
      this.pushPossibleMoves(x + 1, y - 1);
    }
    if (x - 1 >= 0 && y + 1 < boardSize) {
      this.pushPossibleMoves(x - 1, y + 1);
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      this.pushPossibleMoves(x - 1, y - 1);
    }
    this._possibleMoves = [...new Set(this._possibleMoves)];
    return this._possibleMoves;
  }
}
