import Piece from './Piece.js';
import View from '../View.js';

export default class Bishop extends Piece {
  constructor(side, location) {
    super(side, location);
    this.setType('bishop');
    View.display(this.getName(), this.getLocation());
  }

  findPossibleMoves(boardSize) {
    let x = this.getX();
    let y = this.getY();
    //diagonally
    for (let i = x + 1, j = y + 1; i < boardSize && j < boardSize; i++, j++) {
      this.pushPossibleMoves(i, j);
    }
    for (let i = x + 1, j = y - 1; i < boardSize && j >= 0; i++, j--) {
      this.pushPossibleMoves(i, j);
    }
    for (let i = x - 1, j = y + 1; i >= 0 && j < boardSize; i--, j++) {
      this.pushPossibleMoves(i, j);
    }
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      this.pushPossibleMoves(i, j);
    }
    this._possibleMoves = [...new Set(this._possibleMoves)];
    return this._possibleMoves;
  }
}
