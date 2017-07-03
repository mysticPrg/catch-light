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

		const target = shallow(
			<TextField>{inputValue}</TextField>
		);

		const readData = target.find('input').props().value;
		expect(readData).toEqual(inputValue);
	});

	it('should represent a placeholder when value is empty', () => {
		const placeholder = getRandomString(20);

		const target = shallow(
			<TextField placeholder={placeholder}/>
		);

		const readData = target.find('label').text();
		expect(readData).toEqual(placeholder);
	});

	it('should have the light on if it has focus', () => {
		const target = mount(
			<TextField/>
		);

		const input = target.find('input');
		input.simulate('focus');

		const className = input.props().className;

		expect(className).toContain('TextField__input-focus');
	});

	it('placeholder should disappear if the TextField has value', () => {
		const placeholder = getRandomString(20);
		const value = getRandomString(20);

		const target = shallow(
			<TextField placeholder={placeholder}>{value}</TextField>
		);

		const className = target.find('label').props().className;

		expect(className).toContain('TextField__label-hide');
	});

	it('should display the text when it is typed', () => {
		const value = getRandomString(20);
		const event = {
			target: {
				value
			}
		};

		const target = mount(
			<TextField/>
		);

		const input = target.find('input');
		input.simulate('change', event);

		expect(input.props().value).toEqual(value);
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

	it('should call the registered handler when the change event occurs', () => {
		const changeHandler = jasmine.createSpy();
		const value = getRandomString(20);
		const event = {
			target: {
				value
			}
		};

		const target = mount(
			<TextField
				onChange={changeHandler}
			/>
		);

		const input = target.find('input');

		input.simulate('change', event);
		expect(changeHandler).toHaveBeenCalled();

		expect(changeHandler.calls.first().args[0].target.value).toEqual(event.target.value);
	});
});
