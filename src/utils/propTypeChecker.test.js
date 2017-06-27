import {
	combineChecker,
	rangeCheck,
	compareWithOtherProps
} from './propTypeChecker';

describe('combineChecker', () => {
	it('should be makes a new function object', () => {
		expect(typeof combineChecker()).toBe('function');
	});

	it('parameters must be functions', () => {
		const normalSet = [
			() => {},
			() => {}
		];

		const errorSet = [ 0, () => {} ];

		expect(() => {
			combineChecker(...normalSet);
		}).not.toThrow();

		expect(() => {
			combineChecker(...errorSet);
		}).toThrow();
	});

	it('returned function must call all functions with the given parameters', () => {
		const args = {
			n: 0,
			str: 'string'
		};
		const checkerFuncArr = [];
		const checkerCount = 10;

		for ( let i=0 ; i<checkerCount ; i++ ) {
			checkerFuncArr.push(jasmine.createSpy());
		}

		const checker = combineChecker(...checkerFuncArr);

		checker(args);

		for ( let i=0 ; i<checkerCount ; i++ ) {
			expect(checkerFuncArr[i]).toHaveBeenCalledWith(args);
		}
	});
});

describe('rangeCheck', () => {
	it('should be makes a new function object', () => {
		expect(typeof rangeCheck(0, 1)).toBe('function');
	});

	it('min and max must be number value', () => {
		const normalSet = {
			min: 0,
			max: 10
		};

		const errorSet = {
			min: '0',
			max: {}
		};

		expect(() => {
			rangeCheck(normalSet.min, normalSet.max);
		}).not.toThrow();

		expect(() => {
			rangeCheck(errorSet.min, errorSet.max);
		}).toThrow();
	});

	it('min must be less than max', () => {
		const normalSet = {
			min: 0,
			max: 100
		};

		const errorSet = {
			min: 100,
			max: 0
		};

		expect(() => {
			rangeCheck(normalSet.min, normalSet.max);
		}).not.toThrow();

		expect(() => {
			rangeCheck(errorSet.min, errorSet.max);
		}).toThrow();
	});

	it('returned function must ensure that the input value is a number', () => {
		const props = {
			numberValue: 0,
			strNumberValue: '0',
			notNumberValue: 'ABC'
		};

		const checker = rangeCheck(0, 1);

		let result = checker(props, 'numberValue');
		expect(result).toBeFalsy();

		result = checker(props, 'strNumberValue');
		expect(result).toBeFalsy();

		result = checker(props, 'notNumberValue');
		expect(result instanceof Error).toBeTruthy();
	});

	it('returned function must check whether the input value is between min and max', () => {
		const min = 0;
		const max = 100;
		const normalSet = {
			value: 50
		};
		const errorSet = {
			value: 101
		};

		const checker = rangeCheck(min, max);
		
		expect(checker(normalSet, 'value')).toBeFalsy();
		expect(checker(errorSet, 'value') instanceof Error).toBeTruthy();
	});
});

describe('compareWithOtherProps', () => {
	it('should be makes a new function object', () => {
		expect(typeof compareWithOtherProps('propname', ()=>{})).toBe('function');
	});

	it('first argument must be string', () => {
		const normalSet = {
			otherPropName: 'propname',
			compareFunc: () => {}
		};
		const errorSet = {
			otherPropName: 0,
			compareFunc: () => {}
		};

		expect(() => {
			compareWithOtherProps(normalSet.otherPropName, normalSet.compareFunc);
		}).not.toThrow();

		expect(() => {
			compareWithOtherProps(errorSet.otherPropName, errorSet.compareFunc);
		}).toThrow();
	});

	it('second argument must be function', () => {
		const normalSet = {
			otherPropName: 'propname',
			compareFunc: () => {}
		};
		const errorSet = {
			otherPropName: 'propname',
			compareFunc: 'func'
		};

		expect(() => {
			compareWithOtherProps(normalSet.otherPropName, normalSet.compareFunc);
		}).not.toThrow();

		expect(() => {
			compareWithOtherProps(errorSet.otherPropName, errorSet.compareFunc);
		}).toThrow();
	});

	it('returned function must compare the values using the comparison function and return true or false', () => {
		const props = {};
		const propName = 'prop1';
		const otherPropName = 'prop2';
		props[propName] = 0;
		props[otherPropName] = 0;

		const compareFunc = (val1, val2) => (val1 !== val2);

		const checker = compareWithOtherProps(otherPropName, compareFunc);
		const result = checker(props, propName);

		expect(typeof result === 'boolean').toBeTruthy();
	});
});