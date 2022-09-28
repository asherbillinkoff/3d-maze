class Heap2 {
  _heap = [];

  peek() {
    return this._heap[0] ?? null;
  }

  add(item) {
    const nodes = this._heap;
    nodes.push(item);

    if (nodes.length === 1) {
      return;
    }

    let currentIndex = nodes.length - 1; // Bubble up the added node as long as the parent is bigger

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex + 1) / 2) - 1;
      const parent = nodes[parentIndex];

      if (parent.priority <= item.priority) {
        break;
      }

      nodes[currentIndex] = parent;
      nodes[parentIndex] = item;
      currentIndex = parentIndex;
    }
  }

  poll() {
    const nodes = this._heap;
    const result = nodes[0];
    const lastElement = nodes.pop(); // heap was empty or removed the last element

    if (result == null || nodes.length === 0) {
      return result ?? null;
    }

    let index = 0;
    nodes[0] = lastElement ?? null;
    const element = nodes[0];

    while (true) {
      let swapIndex = null;
      const rightChildIndex = (index + 1) * 2;
      const leftChildIndex = rightChildIndex - 1;
      const rightChild = nodes[rightChildIndex];
      const leftChild = nodes[leftChildIndex]; // if the left child is smaller, swap with the left

      if (leftChild != null && leftChild.priority < element.priority) {
        swapIndex = leftChildIndex;
      } // If the right child is smaller or the right child is smaller than the left
      // then swap with the right child

      if (
        rightChild != null &&
        rightChild.priority < (swapIndex == null ? element : leftChild).priority
      ) {
        swapIndex = rightChildIndex;
      }

      if (swapIndex == null) {
        break;
      }

      nodes[index] = nodes[swapIndex];
      nodes[swapIndex] = element;
      index = swapIndex;
    }

    return result;
  }
};

export default Heap2;
