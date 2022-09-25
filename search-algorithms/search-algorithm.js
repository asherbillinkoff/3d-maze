class SearchAlgorithm {
    constructor() {}
    search(searchable) {}
    getNumberOfNodesEvaluated() {}

    testSearchAlgorithm(searchAlgo, searchable) {
        solution = searchAlgo.search(searchable);
        numOfNodes = getNumberOfNodesEvaluated();
        return [solution, numOfNodes]
    }
}

export default SearchAlgorithm;