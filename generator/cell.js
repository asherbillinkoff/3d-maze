class Cell {
  /** @type {Map<Number, Boolean>} */
  #walls
  #position
  #status

  static directions = ['l', 'r', 'f', 'b', 'u', 'd'];

  constructor(z, y, x) {
    // Positions in this map will correspond to ('l', 'r', 'f', 'b', 'u', 'd') => (left, right, forward (top of page), backward (bottom of page), up, down)
    this.#walls = new Map();          // Keys = directions above, Values = wall status boolean.
    this.#position = [z, y, x];       // Internal object pointer to the cells location in the maze.
    this.#status = new Set();         // If set contains 'a' -> player currently on this cell (active); 's' -> start cell; 'g' -> goal cell
  }

  get walls() {
    return this.#walls;
  }

  allWalls() {
    for (const direction of Cell.directions) {
      this.#walls.set(direction, true);
    }
  } 

  addWall(direction, boolean) {
    if (!Cell.directions.includes(direction) && typeof boolean !== "boolean" ) {
      throw new Error('Wall update invalid.')
    }
    this.#walls.set(direction, boolean);
  }

  removeWall(direction) {
    this.#walls.set(direction, false);
  }

  get position() {
    return this.#position;
  }

  updateStatus(value) {
    if (value !== 'v' && value !== 's' && value !== 'g') {
      throw new Error("Invalid cell status update. Only accepts 'v', 's', 'g'")
    }
    this.#status.add(value);
  }

  checkStatus(value) {
    return this.#status.has(value);
  }
}

export default Cell;