class Maze3DGenerator {
    constructor(rows, columns, levels) {
        if (this.constructor === Maze3DGenerator) {
            throw new Error('Cannot instantiate the abstract class Maze3DGenerator');
          }
        this.rows = rows;
        this.columns = columns;
        this.levels = levels;
    }

    generate() {
        throw new Error('This method must be implemented in a subclass')
        // returns an instance of Maze3D object (only a 2D slice)
        // mehod will run as many times are there are levels
        // this should probably be an abstract method
    }

    toString() {
        // will be passed the maze 3d object and will print out the levels to the console
    }

    measureAlgorithmTime() {
        //calls generate and times it.
    }
}

export default Maze3DGenerator;