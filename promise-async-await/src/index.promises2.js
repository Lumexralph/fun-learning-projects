// ADD SUM USING PROMISE
let resultA, resultB, resultC;

function addAsync(num1, num2) {  
    return Promise.resolve(num1 + num2);
}

addAsync(1, 2)
	.then(success => {
		resultA = success;
        return resultA;
	})
	.then(success => addAsync(success, 3))
	.then(success => {
		resultB = success;
        return resultB;
	})
	.then(success => addAsync(success, 4))
	.then(success => {
		resultC = success;
        return resultC;
	})
    .then(success => {
        console.log('total: ' + success)
        console.log(resultA, resultB, resultC)
    });