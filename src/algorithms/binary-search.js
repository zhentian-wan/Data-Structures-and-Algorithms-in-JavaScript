let items = [10,5,6,7,1,3,2,4];
items = items.sort((a,b) => {return a-b})

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

console.log(binarySearch(items,3));