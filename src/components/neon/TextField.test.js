import React from 'react';
import { shallow } from 'enzyme';

import TextField from './TextField';
import { getRandomString } from '../../utils/common';

describe('TextField', () => {
	it('should be render without crash', () => {
		expect(() => {
			shallow(<TextField/>);
		}).not.toThrow();
	});

	it('should be initialized to the input value', () => {
		const inputValue = getRandomString(20);
		console.log(inputValue);

		const target = shallow(
			<TextField>{inputValue}</TextField>
		);

		const readData = target.find('input').props().value;
		expect(readData).toEqual(inputValue);
	});

	it('should represent a placeholder when not focused');
	it('should have the light on if it has focus');
	it('should disappear if the TextField has focus');
	it('should display the text when it is typed');
	it('should call the registered handler when the mouse event occurs');
	it('should call the registered handler when the keyboard event occurs');
	it('should call the registered handler when the focus event occurs');
});