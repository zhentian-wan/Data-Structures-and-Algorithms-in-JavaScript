function insertionSort (array) {
    let i = 0
    let j = 0

    for (i = 1; i < array.length; i++) {
        for (j = 0; j < i; j++) {
            if (array[i] < array[j]) {
                const [item] = array.splice(i, 1); // get the item on ith position
                array.splice(j, 0, item);// insert the item on jth position
            }
        }
    }

    return array;
}

let numbers = [10, 5, 6, 3, 2, 8, 9, 4, 7, 1]

console.log(insertionSort(numbers))