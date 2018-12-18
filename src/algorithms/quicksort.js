function quickSort (array) {

    if (array.length <= 1) {
        return array;
    }

    let pivotIndex = 0;
    let pivot = array[pivotIndex];

    let less = []
    let greater = []

    for (let i in array) {
        if (i != pivotIndex) {
            array[i] > pivot ? greater.push(array[i]): less.push(array[i]);
        }
    }

    return [
        ...quickSort(less),
        pivot,
        ...quickSort(greater)
    ]
}

console.log(quickSort([6, 5, 4, 3, 2, 1, 20, 13,16,9, 11,43,52]))