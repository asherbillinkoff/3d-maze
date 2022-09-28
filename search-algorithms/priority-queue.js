'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Priority queue that processes tasks in natural ordering (lower priority first)
 * according to the priority computed by the function passed in the constructor.
 *
 * FIFO ordering isn't guaranteed for tasks with the same priority.
 *
 * Worker specific tasks with the same priority as a non-worker specific task
 * are always processed first.
 */
class PriorityQueue {
  _queue = [];
  _sharedQueue = new MinHeap();

  constructor(_computePriority) {
    this._computePriority = _computePriority;
  }

  enqueue(task, workerId) {
    if (workerId == null) {
      this._enqueue(task, this._sharedQueue);
    } else {
      const queue = this._getWorkerQueue(workerId);

      this._enqueue(task, queue);
    }
  }

  _enqueue(task, queue) {
    const item = {
      priority: this._computePriority(task.request[2], ...task.request[3]),
      task
    };
    queue.add(item);
  }

  dequeue(workerId) {
    const workerQueue = this._getWorkerQueue(workerId);

    const workerTop = workerQueue.peek();

    const sharedTop = this._sharedQueue.peek(); // use the task from the worker queue if there's no task in the shared queue
    // or if the priority of the worker queue is smaller or equal to the
    // priority of the top task in the shared queue. The tasks of the
    // worker specific queue are preferred because no other worker can pick this
    // specific task up.

    if (
      sharedTop == null ||
      (workerTop != null && workerTop.priority <= sharedTop.priority)
    ) {
      return workerQueue.poll()?.task ?? null;
    }

    return this._sharedQueue.poll().task;
  }

  _getWorkerQueue(workerId) {
    let queue = this._queue[workerId];

    if (queue == null) {
      queue = this._queue[workerId] = new MinHeap();
    }

    return queue;
  }
};

export default PriorityQueue;