let items = [10,5,6,7,1,3,2,4];
items = items.sort((a,b) => {return a-b})

/**
 * Binary search is used for find a item in a sorted array.
 * 
 * 1. Find the middle item as a 'guess'
 * 2. Use the 'guess' to compare with the predict item
 * 3. If guessed item === passed in item; then return true
 * 4. If guessed item > passed in item; then update 'high'
 * 5. If guessed item < passed in item; then update 'low'
 * 6. Otherwise retrun null
 * 
 * @param {Array} list 
 * @param {Number} item 
 */
function binarySearch (list, item = null) {
    let low =  0;
    let high = list.length;
    let counter = 0;

    while (low <= high) {
        counter++;
        console.log(counter)
        let med = Math.floor((low + high) / 2)
        let guess = list[med];
        if (guess === item) return true;
        if (guess > item) high = med - 1;
        else low = med + 1
    }

    return null
}

function bs (list, item = null) {
    if (!Array.isArray(list)) return null;

    // Termination condition
    let low = 0;
    let high = list.length;
    
    while (low <= high) {
        let med = Math.floor((low + high) / 2) - 1;
        const guess = list[med];

        if (guess === item) {
            return true;
        }

        if (guess > item) {
            high = med - 1;
        } else {
            low = med + 1;
        }
    }

    return null;
}

// console.log(binarySearch(items,3));
console.log(bs(items,4));