import Board from './Board.js';
import Utils from './Util.js';
import View from './View.js';

export default class Model {
  _board = new Board();
  _selected = '';
  _possibleMoves = [];
  _killablePieces = [];

  _select(location) {
    this._selected = location;
    View.display('selected', this._selected);
    this.findPossibleMoves(this._selected);
  }

  _unSelect(location) {
    View.removeDisplay('selected', location);
    this.removePossibleMoves();
    this._selected = '';
  }

  getBoard() {
    return this._board;
  }

  getSelected() {
    return this._selected;
  }

  toggleSelect(location) {
    let temp = this._board.getCell(location);
    if (!Utils.isEmptyObj(temp)) {
      if (!this._selected) {
        this._select(location);
      } else {
        if (this._selected === location) {
          this._unSelect(this._selected);
        } else {
          this._unSelect(this._selected);
          this._select(location);
        }
      }
    }
  }

  move(newLocation) {
    if (
      this._possibleMoves.includes(newLocation) ||
      this._killablePieces.includes(newLocation)
    ) {
      let temp = this._board.getCell(this._selected);
      let temp1 = this._board.getCell(newLocation);
      if (!Utils.isEmptyObj(temp1)) {
        temp1.remove();
        this._board.setCell({}, newLocation);
      }
      if (temp.getType() === 'pawn') {
        if (temp.getSpecialMove() === 1) {
          temp.setSpecialMove(0);
        }
        temp.removeKillablePieces();
      }
      temp.removePossibleMoves();
      temp.move(newLocation);
      this._board.setCell(temp, newLocation);
      this._board.setCell({}, this._selected);
      this._unSelect(this._selected);
      return true;
    }
    return false;
  }

  findPossibleMoves(location) {
    let temp = this._board.getCell(location);
    let side = temp.getSide();
    if (!Utils.isEmptyObj(temp)) {
      let array = temp.findPossibleMoves(this._board.getSize());
      array.forEach((tempLocation) => {
        let temp1 = this._board.getCell(tempLocation);
        if (Utils.isEmptyObj(temp1)) {
          if (this.checkMovable(location, tempLocation)) {
            this._possibleMoves.push(tempLocation);
            View.display('possible', tempLocation);
          }
        } else {
          if (temp1.getSide() !== side) {
            if (temp.getType() !== 'knight') {
              if (this.checkMovable(location, tempLocation)) {
                this._killablePieces.push(tempLocation);
                View.display('killable', tempLocation);
              }
            } else {
              this._killablePieces.push(tempLocation);
              View.display('killable', tempLocation);
            }
          }
        }
      });
      if (temp.getType() == 'pawn') {
        temp.findPossibleMoves(this._board.getSize());
        let array = temp.getKillablePieces();
        array.forEach((tempLocation) => {
          let temp1 = this._board.getCell(tempLocation);
          if (!Utils.isEmptyObj(temp1)) {
            if (temp1.getSide() !== temp.getSide()) {
              this._killablePieces.push(tempLocation);
              View.display('killable', tempLocation);
            }
          }
        });
      }
    }
  }

  checkMovable(location1, location2) {
    let [x1, y1] = [+location1[0], +location1[1]];
    let [x2, y2] = [+location2[0], +location2[1]];
    if (x1 == x2) {
      if (y1 < y2) {
        for (let i = y1 + 1; i < y2; i++) {
          let temp = this._board.getCell(x1 + '' + i);
          if (!Utils.isEmptyObj(temp)) return false;
        }
      } else {
        for (let i = y2 + 1; i < y1; i++) {
          let temp = this._board.getCell(x1 + '' + i);
          if (!Utils.isEmptyObj(temp)) return false;
        }
      }
    } else if (y1 == y2) {
      let temp = this._board.getCell(location1);
      if (temp.getType() === 'pawn') {
        if (!Utils.isEmptyObj(this._board.getCell(location2))) return false;
      }
      if (x1 < x2) {
        for (let i = x1 + 1; i < x2; i++) {
          let temp = this._board.getCell(i + '' + y1);
          if (!Utils.isEmptyObj(temp)) return false;
        }
      } else {
        for (let i = x2 + 1; i < x1; i++) {
          let temp = this._board.getCell(i + '' + y1);
          if (!Utils.isEmptyObj(temp)) return false;
        }
      }
    } else {
      if (x1 < x2) {
        if (y1 < y2) {
          for (let i = x1 + 1, j = y1 + 1; i < x2 && j < y2; i++, j++) {
            let temp = this._board.getCell(i + '' + j);
            if (!Utils.isEmptyObj(temp)) return false;
          }
        } else {
          for (let i = x1 + 1, j = y1 - 1; i < x2 && j > y2; i++, j--) {
            let temp = this._board.getCell(i + '' + j);
            if (!Utils.isEmptyObj(temp)) return false;
          }
        }
      } else {
        if (y1 < y2) {
          for (let i = x1 - 1, j = y1 + 1; i > x2 && j < y2; i--, j++) {
            let temp = this._board.getCell(i + '' + j);
            if (!Utils.isEmptyObj(temp)) return false;
          }
        } else {
          for (let i = x1 - 1, j = y1 - 1; i > x2 && j > y2; i--, j--) {
            let temp = this._board.getCell(i + '' + j);
            if (!Utils.isEmptyObj(temp)) return false;
          }
        }
      }
    }
    return true;
  }

  removePossibleMoves() {
    this._possibleMoves.forEach((location) => {
      View.removeDisplay('possible', location);
    });
    this._possibleMoves = [];
    this._killablePieces.forEach((location) => {
      View.removeDisplay('killable', location);
    });
    this._killablePieces = [];
  }
}
