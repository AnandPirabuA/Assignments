

export function counter(value = 0) {
    let val = value;
    return [
        function() { console.log(val)}, function() { val++ } ]
}

const [getA, nextA] = counter(1);
getA(); // 1
nextA();
getA(); // 2
const [getB, nextB] = counter(10);
nextB();
getA(); // 2
getB(); // 11
nextA();
getA(); // 3
getB(); // 11