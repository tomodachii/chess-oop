import Utils from './Util.js';
import {
  Piece,
  Pawn,
  Bishop,
  Knight,
  Rook,
  King,
  Queen,
} from './pieces/Pieces.js';

export default class Board {
  _size = 0;
  _pieceNumber = 0;
  _pieceSides = [];
  _cell = [];

  constructor() {
    this.setSize(8);
    this.setPieceNumber(32);
    this.setPieceSides(['white', 'black']);
    this.init();
  }

  init() {
    for (let i = 0; i < this.getSize(); i++) {
      if (!this._cell[i]) this._cell[i] = [];
      for (let j = 0; j < this.getSize(); j++) {
        this.setCell({}, Utils.toLocation(i, j));
      }
    }
    for (let i = 0; i < this.getSize(); i++) {
      this.setCell(new Pawn(this.getPieceSides()[1], '1' + i), '1' + i);
      this.setCell(new Pawn(this.getPieceSides()[0], '6' + i), '6' + i);
    }

    this.setCell(new Rook(this.getPieceSides()[1], '00'), '00');
    this.setCell(new Rook(this.getPieceSides()[1], '07'), '07');
    this.setCell(new Rook(this.getPieceSides()[0], '70'), '70');
    this.setCell(new Rook(this.getPieceSides()[0], '77'), '77');

    this.setCell(new Knight(this.getPieceSides()[1], '01'), '01');
    this.setCell(new Knight(this.getPieceSides()[1], '06'), '06');
    this.setCell(new Knight(this.getPieceSides()[0], '71'), '71');
    this.setCell(new Knight(this.getPieceSides()[0], '76'), '76');

    this.setCell(new Bishop(this.getPieceSides()[1], '02'), '02');
    this.setCell(new Bishop(this.getPieceSides()[1], '05'), '05');
    this.setCell(new Bishop(this.getPieceSides()[0], '72'), '72');
    this.setCell(new Bishop(this.getPieceSides()[0], '75'), '75');

    this.setCell(new Queen(this.getPieceSides()[1], '04'), '04');
    this.setCell(new Queen(this.getPieceSides()[0], '74'), '74');

    this.setCell(new King(this.getPieceSides()[1], '03'), '03');
    this.setCell(new King(this.getPieceSides()[0], '73'), '73');
  }

  getSize() {
    return this._size;
  }

  setSize(size) {
    this._size = size;
  }

  getPieceNumber() {
    return this._pieceNumber;
  }

  setPieceNumber(pieceNumber) {
    this._pieceNumber = pieceNumber;
  }

  getPieceSides() {
    return this._pieceSides;
  }

  setPieceSides(pieceSides) {
    this._pieceSides = pieceSides;
  }

  getCell(location) {
    let [x, y] = [+location[0], +location[1]];
    return this._cell[x][y];
  }

  setCell(obj, location) {
    let [x, y] = [+location[0], +location[1]];
    this._cell[x][y] = obj;
  }

  getBoard() {
    return this._cell;
  }
}
