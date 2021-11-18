import Piece from './Piece.js';
import View from '../View.js';

export default class Pawn extends Piece {
  _killablePieces = [];

  getKillablePieces() {
    return this._killablePieces;
  }

  pushKillablePieces(x, y) {
    this._killablePieces.push(x + '' + y);
  }

  constructor(side, location) {
    super(side, location);
    this.setType('pawn');
    this.setSpecialMove(1);
    View.display(this.getName(), this.getLocation());
  }

  findPossibleMoves(boardSize) {
    let x = this.getX();
    let y = this.getY();
    //vertically
    if (this.getSide() === 'black') {
      if (x + 1 < boardSize) {
        this.pushPossibleMoves(x + 1, y);
        if (y - 1 >= 0) {
          this.pushKillablePieces(x + 1, y - 1);
        }
        if (y + 1 < boardSize) {
          this.pushKillablePieces(x + 1, y + 1);
        }
      }

      if (this.getSpecialMove() == 1) {
        this.pushPossibleMoves(x + 2, y);
      }
    }

    if (this.getSide() === 'white') {
      if (x - 1 >= 0) {
        this.pushPossibleMoves(x - 1, y);
        if (y - 1 >= 0) {
          this.pushKillablePieces(x - 1, y - 1);
        }
        if (y + 1 < boardSize) {
          this.pushKillablePieces(x - 1, y + 1);
        }
      }

      if (this.getSpecialMove() == 1) {
        this.pushPossibleMoves(x - 2, y);
      }
    }

    this._killablePieces = [...new Set(this._killablePieces)];
    this._possibleMoves = [...new Set(this._possibleMoves)];
    return this._possibleMoves;
  }

  removeKillablePieces() {
    this._killablePieces = [];
  }
}
