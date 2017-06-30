import React from 'react';
import { shallow } from 'enzyme';

import TextField from './TextField';

describe('TextField', () => {
	it('should be render without crash', () => {
		expect(() => {
			shallow(<TextField/>);
		}).not.toThrow();
	});
});