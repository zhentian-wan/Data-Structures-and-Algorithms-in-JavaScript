/**
 * Stack
 * 
 * Last in First Out > LIFO
 */

function createStack() {
    const array = [];
    return {
        push(item) {
            array.push(item)
        },
        pop() {
            return array.pop()
        },
        peek() {
            return array[array.length - 1];
        },
        get length () {
            return array.length;
        },
        isEmpty() {
            return array.length === 0;
        }
    }
}

const s = createStack();
s.push('one');
s.push('two');
s.push('three');

s.pop();
console.log(s.peek())