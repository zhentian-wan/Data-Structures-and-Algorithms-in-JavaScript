/**
 *
 * Queue
 *
 * First in First out
 *
 * API:
 *
 * enqueue() - Push a new item to the first place
 * dequeue() - Get first in item from the last of array
 * peek() - Check the next item in the queue
 * length
 * isEmpty()
 */

function createQueue() {
  const queue = [];
  return {
    enqueue(item) {
      queue.unshift(item);
    },
    dequeue() {
      return queue.pop();
    },
    peek() {
      return queue[queue.length - 1];
    },
    get length() {
      return queue.length;
    },
    isEmpty() {
      return queue.length === 0;
    },
  };
}

/**
 *
 * Priority Queue
 *
 * First in First out for priority list and normal list
 *
 * API:
 *
 * enqueue() - Push a new item to the first place
 * dequeue() - Get first in item from the last of array
 * peek() - Check the next item in the queue
 * length
 * isEmpty()
 */
function createPriorityQueue() {
    const queue = createQueue();
    const p_queue = createQueue();
    return {
        enqueue (item, isPriority) {
            if (isPriority) {
                return p_queue.enqueue(item)
            }

            queue.enqueue(item)
        },
        dequeue () {
            if (!p_queue.isEmpty()) {
                return p_queue.dequeue()
            }

            return queue.dequeue()
        },
        peek () {
            if (!p_queue.isEmpty()) {
                return p_queue.peek()
            }

            return queue.peek()
        },
        get length () {
            return p_queue.length + queue.length;
        },
        isEmpty () {
            return p_queue.isEmpty() && queue.isEmpty();
        }
    }
}

module.exports = {createQueue, createPriorityQueue};

const q = createQueue();
q.enqueue("Learn algorithoms");
q.enqueue("Learn data structure");
q.enqueue("Learn thinking");

console.log(q.peek()); // 'Learn algorithoms'
q.dequeue();
console.log(q.peek()); // 'Learn data structure'
q.dequeue();
console.log(q.peek()); // 'Learn thinking'
q.dequeue();
console.log(q.isEmpty());

const pq = createPriorityQueue()
pq.enqueue('A fix here')
pq.enqueue('A bug there')
pq.enqueue('A new feature')

pq.dequeue()
pq.enqueue('Emergency task!', true)
console.log(pq.dequeue())
console.log(pq.peek())


