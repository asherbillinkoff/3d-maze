class Maze3DGenerator {
    constructor(levels, columns, rows) {
        if (this.constructor === Maze3DGenerator) {
            throw new Error('Cannot instantiate the abstract class Maze3DGenerator');
        }
        this.levels = levels;
        this.columns = columns;
        this.rows = rows;
    }

    generate() {
        throw new Error('This method must be implemented in a subclass')
        // returns an instance of Maze3D object (only a 2D slice)
        // mehod will run as many times are there are levels
        // this should probably be an abstract method
    }

    measureAlgorithmTime() {
        //calls generate and times it.
    }
};

export default Maze3DGenerator;