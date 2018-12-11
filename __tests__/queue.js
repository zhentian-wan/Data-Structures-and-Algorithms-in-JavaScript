const {createQueue, createPriorityQueue} = require("../src/queue");

describe("Queue test", () => {
  test("should be first in first out", () => {
    const q = createQueue();
    q.enqueue("1");
    q.enqueue("2");
    q.enqueue("3");

    expect(q.peek()).toBe("1");

    q.dequeue();
    expect(q.peek()).toBe("2");

    q.dequeue();
    expect(q.peek()).toBe("3");

    q.dequeue();
    expect(q.isEmpty()).toBe(true);
  });
});

describe('Priority Queue', () => {
    test('should work with priority queue', () => {
        const q = createPriorityQueue();

        q.enqueue('A fix here')
        q.enqueue('A bug there')
        q.enqueue('A new feature')

        q.dequeue()
        q.enqueue('Emergency task!', true)
        expect(q.peek()).toBe('Emergency task!')
    })
})
