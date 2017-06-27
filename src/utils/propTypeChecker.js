export function combineChecker(...checkers) {

	const count = checkers.length;
	for ( let i=0 ; i<count ; i++ ) {
		if ( typeof checkers[i] !== 'function' ) {
			throw new Error('parameters must be functions');
		}
	}

	return (...checkerArgs) => {
		for ( let i=0 ; i<count ; i++ ) {
			let err = checkers[i](...checkerArgs);
			if ( err ) {
				return err;
			}
		}

		return null;
	};
}

export function rangeCheck(min, max) {

	if ( typeof min !== 'number' || isNaN(min)
		|| typeof max !== 'number' || isNaN(max) ) {
		throw new Error('Min and max must be number value');
	}

	if ( min >= max ) {
		throw new Error('Min must be less than max');
	}

	return (props, propName) => {
		const value = parseInt(props[propName], 10);

		if ( isNaN(value) ) {
			return new Error('Property value is not a number.');
		}

		if ( value < min || value > max ) {
			return new Error(`Property value range is ${min} to ${max}.`);
		}
	};
};

export function compareWithOtherProps(otherPropName, compareFunc) {

	if ( typeof otherPropName !== 'string' ) {
		throw new Error('otherPropName must be string');
	}

	if ( typeof compareFunc !== 'function' ) {
		throw new Error('compareFunc must be string');
	}

	return (props, propName, component, location) => {
		const value = props[propName];
		const otherValue = props[otherPropName];

		return compareFunc(value, otherValue, component, location);
	};
}