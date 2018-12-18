/**
 * Linked list
 * 
 * API:
 * push
 * pop
 * get
 * delete
 * isEmpty
 * print
 */

 function createNode(value) {
     return {
         value,
         next: null
     }
 }

 function createLinkedList() {
     return {
         head: null,
         tail: null,
         length: 0,
         push(value) {
             /**Key takeaway: 
              *  Assign new node to current tail's next value
              *  Then
              *  Reassign the tail to new node
              */
             // Create Node
            const node = createNode(value);

            // If this is the first one
            if (this.head === null) {
                this.head = node
                this.tail = node
                this.length++;
                return node;
            }

            // if there already has nodes
            this.tail.next = node;
            this.tail = node;
            this.length++;
            return node;
         },
         pop() {
             const node = this.tail;
             // if this is no node
             if (!this.head) {
                 return null;
             }

             // if there is one node
             if (this.head === this.tail) {
                 this.head = null;
                 this.tail = null;
                 return node;
             }

             let current = this.head;
             let penultimate = null;

             while (current) {
                const {next} = current;
                if (next && next == this.tail) {
                    penultimate = current;
                    break;
                }
                current = current.next;
             }
             penultimate.next = null;
             this.tail = penultimate;
             this.length--;
             return node;
         },
         get(index = 0) {
            // no node in the list, return null
            if (!this.head) {
                return null;
            }

            // if the index < 0 or > length - 1, out of range
            if (index < 0 || index > this.length - 1) {
                return null;
            }

            // if index = 0, then return the first
            if (index === 0) {
                return this.head;
            }

            let current = this.head;
            let i = 0;
            while (i < index) {
                i++;
                current = current.next;
            }

            return current;
         },
         delete(index = 0) {
             /**
              * Key takewawy:
              * If we delete tail, we need to reassign the tail
              */
            // no node in the list, return null
            if (!this.head) {
                return null;
            }

            // if the index < 0 or > length - 1, out of range
            if (index < 0 || index > this.length - 1) {
                return null;
            }

            // if index = 0, then return the first
            if (index === 0) {
                const node = this.head;
                this.head = node.next;
                this.length--;
                return node;
            }

            let i = 0;
            let current = this.head;
            let previous = null;

            while (i < index) {
                i++;
                previous = current;
                current = current.next;
            }

            const deleted = current;
            previous.next = deleted.next;

            // If we delete the tail, we need to reassign tail
            if (previous.next === null) {
                this.tail = previous;
            }

            this.length--;
            return deleted;
         },
         isEmpty() {
             return this.length === 0;
         },
         print() {
            /**Key takeway: 
             *  remember to assign next node to current 
             *  Move the while loop
             * */
            let nodes = [];

            if (!this.head) {
                return 'Empty list';
            }

            let current = this.head;
            while (current) {
                nodes.push(current.value);
                current = current.next;
            }
            
            return nodes.join(' => ');
         }
     };
 }

 module.exports = {createLinkedList}