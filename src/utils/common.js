export function getRandomNumber(min, max) {
	return min + Math.floor(Math.random() * (max-min));
};


export function getFakeKey() {
	let key = null;
	do {
		key = getRandomNumber(0, 99999);
	} while ( getFakeKey.keys[key] !== undefined );

	getFakeKey.keys[key] = true;
	
	return key;
};
getFakeKey.keys = [];

export function getRandomColor() {
	let r = getRandomNumber(0, 255).toString(16);
	let g = getRandomNumber(0, 255).toString(16);
	let b = getRandomNumber(0, 255).toString(16);

	if ( r.length === 1 ) {
		r = `0${r}`;
	}
	if ( g.length === 1 ) {
		g = `0${g}`;
	}
	if ( b.length === 1 ) {
		b = `0${b}`;
	}

	return `#${r}${g}${b}`;
};