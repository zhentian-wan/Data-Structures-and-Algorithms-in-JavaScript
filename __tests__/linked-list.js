const {createLinkedList} = require('../src/linked-list');

describe('linked list', () => {
    test('push: should add node into array', () => {
        const l = createLinkedList();
        // linked list should be empty
        expect(l.isEmpty()).toBe(true);
        // push a new node
        l.push('a');
        expect(l.isEmpty()).toBe(false);
        expect(l.length).toEqual(1);
        expect(l.print()).toEqual('a');
        // push a second node
        l.push('b');
        expect(l.length).toEqual(2);
        expect(l.print()).toEqual('a => b');
    });

    test('pop: should remove the last node from the list', () => {
        const l = createLinkedList();
        l.push('a');
        l.push('b');
        l.push('c');
        expect(l.length).toEqual(3);
        const p = l.pop();
        expect(p.value).toEqual('c');
        expect(l.length).toEqual(2);
    });

    test('get: should return the node for the given index', () => {
        const l = createLinkedList();
        // empty list, return null
        expect(l.get(0)).toBeNull();
        l.push('a');
        l.push('b');
        l.push('c');
        expect(l.length).toEqual(3);
        // out of index, retur null
        expect(l.get(-1)).toBeNull();
        expect(l.get(4)).toBeNull();

        // return the head
        expect(l.get(0).value).toEqual('a');

        // index in range not head
        expect(l.get(2).value).toEqual('c');
    });

    test('delete: should delete the node from the given index', () => {
        const l = createLinkedList();
        // empty list, return null
        expect(l.delete(0)).toBeNull();
        l.push('a');
        l.push('b');
        l.push('c');
        expect(l.length).toEqual(3);
        // out of index, retur null
        expect(l.delete(-1)).toBeNull();
        expect(l.delete(4)).toBeNull();
        // return the head
        expect(l.delete(0).value).toEqual('a');
        expect(l.length).toEqual(2);
        // delete the tail, reassign the tail
        expect(l.delete(1).value).toEqual('c');
        expect(l.tail.value).toEqual('b');
    });
});