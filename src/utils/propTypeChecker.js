export function rangeCheck(min, max) {
	return (props, propName) => {
		const value = parseInt(props[propName]);

		if ( isNaN(value) ) {
			return new Error('Property value is not a number.');
		}

		if ( value < min || value > max ) {
			throw new Error(`Property value range is ${min} to ${max}.`);
		}
	}
}