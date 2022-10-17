/**
 * @classdesc This is the base class for other types of maze generators.
 */
class Maze3DGenerator {
    constructor(levels, columns, rows) {
        if (this.constructor === Maze3DGenerator) {
            throw new Error('Cannot instantiate the abstract class Maze3DGenerator');
        }
        this.levels = levels;
        this.columns = columns;
        this.rows = rows;
    }

    // Abstract method to generate and return the maze.
    generate() {}

    // Method to measure how long the algorithm takes to generate the maze.
    measureAlgorithmTime() {
        const start = Date.now();
        this.generate();
        const end = Date.now();
        console.log(`The maze took ${end - start} ms to generate.`);
    }
};

export default Maze3DGenerator;