class Cell {
  /** @type {Map<Number, Boolean>} */
  #walls
  #position
  static directions = ['l', 'r', 'f', 'b', 'u', 'd'];

  constructor(z, y, x) {
    // Positions in this map will correspond to ('l', 'r', 'f', 'b', 'u', 'd') => (left, right, forward (top of page), backward (bottom of page), up, down)
    this.#walls = new Map();          // Keys = directions above, Values = wall status boolean
    this.#position = [z, y, x];
  }

  get walls() {
    return this.#walls;
  }

  get position() {
    return this.#position;
  }

  allWalls() {
    for (const direction of Cell.directions) {
      this.#walls.set(direction, true);
    }
  } 

  addWall(direction, boolean) {
    this.#walls.set(direction, boolean);
  }

  removeWall(direction) {
    this.#walls.set(direction, false);
  }
}

export default Cell;