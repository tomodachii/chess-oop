import Model from './Model.js';
import Utils from './Util.js';

export default class Controller {
  _movesCounter = 0;
  model = new Model();
  side = [];
  turn = '';

  constructor() {
    this.side = this.model.getBoard().getPieceSides();
    this.turn = this.side[0];
    this._movesCounter = 0;
  }

  changeTurn() {
    this._movesCounter++;
    this.turn = this.side[this._movesCounter % 2];
  }

  handleClick(location) {
    let temp = this.model.getBoard().getCell(location);
    if (!Utils.isEmptyObj(temp)) {
      if (this.turn === temp.getSide()) {
        this.model.toggleSelect(location);
      } else {
        if (this.model.getSelected()) {
          if (this.model.move(location)) {
            this.changeTurn();
          }
        }
      }
    } else {
      if (this.model.getSelected()) {
        if (this.model.move(location)) {
          this.changeTurn();
        }
      }
    }
    // console.log(this.turn);
    // console.log(this.model.getBoard());
  }
}
