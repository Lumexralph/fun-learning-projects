//playing around with module using ES 6 module built-in
export let counter = 1;

export function increment() {
	counter++;
}

export function decrement() {
	counter--;
}

/*module.exports = {

	counter: counter,
	increment: increment,
	decrement: decrement
};
*/