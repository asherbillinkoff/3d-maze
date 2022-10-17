/**
 * @classdesc The cell object is used to store information for each individual
 * location within the 3D maze grid. A new cell object is placed in each location.
 */
class Cell {
  /** @type {Map<Number, Boolean>} */
  #walls
  #position
  #status

  static directions = ['l', 'r', 'f', 'b', 'u', 'd'];

  /**
   * 
   * @param {Number} z Z coordinate of the cell location within the maze.
   * @param {Number} y Y coordinate of the cell location within the maze.
   * @param {Number} x X coordinate of the cell location within the maze.
   */
  constructor(z, y, x) {
    // Positions in this map will correspond to ('l', 'r', 'f', 'b', 'u', 'd') => (left, right, forward (top of page), backward (bottom of page), up, down)
    this.#walls = new Map();          // Keys = directions above, Values = wall status boolean.
    this.#position = [z, y, x];       // Internal object pointer to the cells location in the maze.
    this.#status = new Set();         // 's' -> start cell; 'g' -> goal cell.
  }

  // Returns boolean values of all cell walls.
  get walls() {
    return this.#walls;
  }

  // Sets all walls to 'true' for a new cell being constructed. Used in DFS generator.
  allWalls() {
    for (const direction of Cell.directions) {
      this.#walls.set(direction, true);
    }
  } 

  // Adds or removes walls within the cell.
  // TODO: this should be renamed 'editWall' and handle all wall modifications.
  addWall(direction, boolean) {
    if (!Cell.directions.includes(direction) && typeof boolean !== "boolean" ) {
      throw new Error('Wall update invalid.')
    }
    this.#walls.set(direction, boolean);
  }

  //TODO: this should be deleted.
  removeWall(direction) {
    this.#walls.set(direction, false);
  }

  // Returns the cell position array [z, y, x].
  get position() {
    return this.#position;
  }

  // Method for setting start and goal cells.
  updateStatus(value) {
    if (value !== 's' && value !== 'g') {
      throw new Error("Invalid cell status update. Only accepts 's', 'g'")
    }
    this.#status.add(value);
  }

  // Checks the 'status' Set for 'start' or 'goal' values and returns Boolean.
  checkStatus(value) {
    return this.#status.has(value);
  }
}

export default Cell;