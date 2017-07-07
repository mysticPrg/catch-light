import React from 'react';
import { shallow, mount } from 'enzyme';

import TextField from './TextField';
import { getRandomString } from '~/utils/common';

describe('TextField', () => {
	it('should be render without crash', () => {
		expect(() => {
			shallow(<TextField/>);
		}).not.toThrow();
	});

	it('should be initialized to the input value', () => {
		const inputValue = getRandomString(20);

		const target = mount(
			<TextField defaultValue={inputValue}></TextField>
		);

		const readData = target.find('input').get(0).value;
		expect(readData).toEqual(inputValue);
	});

	it('should display the text when it is typed', () => {
		const value = getRandomString(20);
		const event = {
			target: {
				value
			}
		};
		const onChange = jasmine.createSpy();
		let input = null;

		const target = mount(
			<TextField
				innerRef={ref => input = ref}
				onChange={onChange}
			/>
		);

		target.simulate('change', event);
		expect(onChange.calls.first().args[0].target.value).toEqual(value);
	});

	it('should call the registered handler when the focus event occurs', () => {
		const focusHandler = jasmine.createSpy();
		const blurHandler = jasmine.createSpy();
		
		const target = mount(
			<TextField
				onFocus={focusHandler}
				onBlur={blurHandler}
			/>
		);

		const input = target.find('input');

		input.simulate('focus');
		expect(focusHandler).toHaveBeenCalled();

		input.simulate('blur');
		expect(blurHandler).toHaveBeenCalled();
	});
});
