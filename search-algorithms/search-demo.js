import DFSMaze3DGenerator from "../generator/dfs-maze-3d-generator.js";
import MazeDomain from "./searchable-maze-domain.js";
import DFS from "./dfs.js";
import BFS from "./bfs.js";

/**
 * @classdesc Demonstration for comparing the efficiency of different maze
 * solving algorithms.
 */
class SearchDemo {
    /**
     * 
     * @param {Number} levels Number of levels within maze.
     * @param {Number} rows Number of rows within maze.
     * @param {Number} columns Number of columns within maze.
     */
    constructor(levels, rows, columns) {
        this.levels = levels;
        this.columns = columns;
        this.rows = rows;
    }

    run() {
        const dfsGenerator = new DFSMaze3DGenerator(this.levels, this.columns, this.rows);
        const dfsMaze = dfsGenerator.generate();
        const searchableMaze = new MazeDomain(dfsMaze.startCell, dfsMaze.goalCell, dfsMaze.maze);
        
        const dfsSolver = new DFS();
        dfsSolver.search(searchableMaze)
        const dfsNumNodes = dfsSolver.getNumberOfNodes();
        console.log(`DFS Nodes Visited: ${dfsNumNodes}`);
        
        const bfsSolver = new BFS();
        bfsSolver.search(searchableMaze);
        const bfsNumNodes = bfsSolver.getNumberOfNodes();
        console.log(`BFS Nodes Visited: ${bfsNumNodes}`);
    }
};

export default SearchDemo;