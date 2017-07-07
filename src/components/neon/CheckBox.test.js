import React from 'react';
import { shallow } from 'enzyme';

import CheckBox from './CheckBox';

describe('CheckBox', () => {
	it('should be render without crash', () => {
		expect(() => {
			shallow(<CheckBox/>);
		}).not.toThrow();
	});
});