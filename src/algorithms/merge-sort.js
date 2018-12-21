function mergeSort (array) {
    // if array is length less than two items, no need to sort
    if ( array.length < 2 ) {
        return array;
    }

    // find the middle point of the array to split it into two
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(
        mergeSort(left),
        mergeSort(right)
    )
}

function merge(left, right) {
    let sorted = [];
    console.log('left', left)
    console.log('right', right)
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sorted.push(left.shift())
        } else {
            sorted.push(right.shift())
        }
    }


    const reuslts = [...sorted, ...left, ...right];

    console.log('reuslts', reuslts)
    return reuslts;
}

let numbers = [10, 5, 6, 3, 2, 8, 9, 4, 7, 1]

mergeSort(numbers)

exports.mergeSort = mergeSort