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

export function clone(obj) {
	let copy;

	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}
	
	if (obj instanceof Map) {
		return new Map(clone(Array.from(obj)));
	}

	if (obj instanceof Array) {
		copy = [];
		for (let i = 0, len = obj.length; i < len; i++) {
			copy[i] = clone(obj[i]);
		}
		return copy;
	}

	if (obj instanceof Object) {
		copy = {};
		for (const attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = clone(obj[attr]);
			}
		}
		return copy;
	}
	throw new Error('Unable to copy object! Its type isn\'t supported');
};

export const fakeStore = (state) => {
	return {
		default: () => {},
		subscribe: () => {},
		dispatch: () => {},
		getState: () => {
			return { ...state };
		},
	};
};