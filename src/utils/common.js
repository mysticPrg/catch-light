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