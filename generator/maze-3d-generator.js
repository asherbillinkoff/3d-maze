class Maze3DGenerator {
    constructor(rows, columns, levels) {

    }

    generate(rows, columns, levels) {
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