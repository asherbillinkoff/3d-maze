class Maze3DGenerator {
    constructor(levels, columns, rows) {
        if (this.constructor === Maze3DGenerator) {
            throw new Error('Cannot instantiate the abstract class Maze3DGenerator');
        }
        this.levels = levels;
        this.columns = columns;
        this.rows = rows;
    }

    generate() {}

    measureAlgorithmTime() {}
};

export default Maze3DGenerator;