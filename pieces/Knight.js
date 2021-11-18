import Piece from './Piece.js';
import View from '../View.js';

export default class Knight extends Piece {
  constructor(side, location) {
    super(side, location);
    this.setType('knight');
    View.display(this.getName(), this.getLocation());
  }

  findPossibleMoves(boardSize) {
    let x = this.getX();
    let y = this.getY();
    if (x + 1 < boardSize && y + 2 < boardSize)
      this.pushPossibleMoves(x + 1, y + 2);
    if (x + 1 < boardSize && y - 2 >= 0) this.pushPossibleMoves(x + 1, y - 2);
    if (x - 1 >= 0 && y + 2 < boardSize) this.pushPossibleMoves(x - 1, y + 2);
    if (x - 1 >= 0 && y - 2 >= 0) this.pushPossibleMoves(x - 1, y - 2);
    if (x + 2 < boardSize && y + 1 < boardSize)
      this.pushPossibleMoves(x + 2, y + 1);
    if (x + 2 < boardSize && y - 1 >= 0) this.pushPossibleMoves(x + 2, y - 1);
    if (x - 2 >= 0 && y + 1 < boardSize) this.pushPossibleMoves(x - 2, y + 1);
    if (x - 2 >= 0 && y - 1 >= 0) this.pushPossibleMoves(x - 2, y - 1);
    this._possibleMoves = [...new Set(this._possibleMoves)];
    return this._possibleMoves;
  }
}
