import React from 'react';
import { shallow } from 'enzyme';

import Hello from './Hello';

describe('Hello', () => {
	it('should be render without error', () => {
		expect(() => {
			shallow(<Hello/>);
		}).not.toThrow();
	});
});