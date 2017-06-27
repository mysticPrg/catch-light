import React from 'react';
import { shallow, mount } from 'enzyme';

import LightSpace from './LightSpace';
import { getRandomNumber, getFakeKey } from '../../utils/common';

describe('LightSpace', () => {
	it('should be render without crash', () => {
		expect(() => {
			shallow(<LightSpace/>);
		}).not.toThrow();
	});

	it('should be shown given size', () => {
		const width = 500;
		const height = 300;

		const space = shallow(
			<LightSpace
				width={width}
				height={height}
			/>
		);

		const style = space.find('[data-test="space"]').props().style;
		expect(parseFloat(style.width)).toBeCloseTo(width);
		expect(parseFloat(style.height)).toBeCloseTo(height);
	});

	it('should have sperated light', () => {
		const width = 500;
		const height = 500;
		const count = 30;
		const lightArr = [];
		for ( let i=0 ; i<count ; i++ ) {
			lightArr.push({
				id: getFakeKey(),
				color: '#0000FF',
				size: 20,
				alpha: Math.random(),
				'target-x': getRandomNumber(0, width),
				'target-y': getRandomNumber(0, height)
			});
		}

		const space = shallow(
			<LightSpace
				lights={lightArr}
				width={width}
				height={height}
			/>
		);

		expect(space.find('[data-test="light"]').length).toEqual(count);
	});

	it('clicking light should call the callback function with id', () => {
		const width = 500;
		const height = 500;
		const count = 1;
		const lightArr = [];
		for ( let i=0 ; i<count ; i++ ) {
			lightArr.push({
				id: getFakeKey(),
				color: '#0000FF',
				size: 20,
				alpha: Math.random(),
				'target-x': getRandomNumber(0, width),
				'target-y': getRandomNumber(0, height)
			});
		}

		const onLightClick = jasmine.createSpy();
		const space = mount(
			<LightSpace
				lights={lightArr}
				width={width}
				height={height}
				onLightClick={onLightClick}
			/>
		);

		const light = space.find('[data-test="light"]');
		light.simulate('click');

		expect(onLightClick).toHaveBeenCalledWith(lightArr[0].id);

		space.unmount();
	});
});
