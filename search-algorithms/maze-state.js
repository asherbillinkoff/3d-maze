class MazeState extends State {
    #maze
    constructor(maze) {
        super(maze.toString());
        this.#maze = maze;
    }
        get maze() {
            return this.#maze;
    }
};