import React from 'react';
import { shallow } from 'enzyme';

import LightSpace from './LightSpace';

describe('LightSpace', () => {
	it('should be render without crash', () => {
		expect(() => {
			shallow(<LightSpace/>);
		}).not.toThrow();
	});

	it('should be initialize count for lights', () =>{
		const count = 10;
		const lightSpace = shallow(<LightSpace count={count}/>);

		const realCount = lightSpace.find('[data-test="light"]').length;
		expect(realCount).toEqual(count);
	});
});