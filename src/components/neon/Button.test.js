import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';
import { getRandomString } from '~/utils/common';

describe('TextField', () => {
	it('should be render without crash', () => {
		expect(() => {
			shallow(<Button/>);
		}).not.toThrow();
	});

	it('should be initialized to the input value', () => {
		const inputValue = getRandomString(20);

		const target = shallow(<Button>{inputValue}</Button>);

		const value = target.find('button').text();

		expect(value).toEqual(inputValue);
	});

	it('should have the light on if it has focus');
	it('should call the registered handler when the change event occurs');
});
