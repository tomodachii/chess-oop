import Piece from './Piece.js';
import View from '../View.js';

export default class Rook extends Piece {
  constructor(side, location) {
    super(side, location);
    this.setType('rook');
    View.display(this.getName(), this.getLocation());
  }

  findPossibleMoves(boardSize) {
    //horizontally
    let x = this.getX();
    let y = this.getY();
    for (let i = y + 1; i < boardSize; i++) {
      this.pushPossibleMoves(x, i);
    }
    for (let i = y - 1; i >= 0; i--) {
      this.pushPossibleMoves(x, i);
    }
    //vertically
    for (let i = x + 1; i < boardSize; i++) {
      this.pushPossibleMoves(i, y);
    }
    for (let i = x - 1; i >= 0; i--) {
      this.pushPossibleMoves(i, y);
    }
    this._possibleMoves = [...new Set(this._possibleMoves)];
    return this._possibleMoves;
  }
}
