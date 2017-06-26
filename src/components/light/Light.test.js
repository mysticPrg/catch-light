import React from 'react';
import { shallow, mount } from 'enzyme';

import Light from './Light';
/*
	최대 30개까지 만들 수 있고 독립적으로 동작할 수 있어야 함
	최소 1/(30*2)초 안에 30개 모두의 연산이 끝나야 함
	error check..
*/

jest.useRealTimers();

describe('Light', () => {

	beforeEach(function() {
		// jasmine.clock().install();
	});

	afterEach(function() {
		// jasmine.clock().uninstall();
	});

	it('should be render without crash', () => {
		expect(() => {
			shallow(<Light/>);
		}).not.toThrow();
	});

	it('should have x and y values that are randomly initialized within a given range', () => {
		// given
		const x_min = 0;
		const x_max = 1000;
		const y_min = 0;
		const y_max = 1000;

		// when
		const light = shallow(
			<Light
				x-min={x_min}
				x-max={x_max}
				y-min={y_min}
				y-max={y_max}
			/>
		);

		//then
		const style = light.find('[data-test="light"]').props().style;
		const px_filter = /([0-9]*)px/i;
		const x_pos = parseInt(px_filter.exec(style.left)[1]);
		const y_pos = parseInt(px_filter.exec(style.top)[1]);

		expect(x_pos).toBeGreaterThanOrEqual(x_min);
		expect(x_pos).toBeLessThan(x_max);

		expect(y_pos).toBeGreaterThanOrEqual(y_min);
		expect(y_pos).toBeLessThan(y_max);
	});

	it('x-min should be less than x-max', () => {
		const min = 10;
		const max = 5;
		
		const errSpy = spyOn(console, 'error');
		shallow(
			<Light
				x-min={min}
				x-max={max}
			/>
		);
		expect(errSpy).toHaveBeenCalled();
	});

	it.skip('y-min should be less than y-max', () => {
		const min = 10;
		const max = 5;
		
		const errSpy = spyOn(console, 'error');
		shallow(
			<Light
				y-min={min}
				y-max={max}
			/>
		);
		expect(errSpy).toHaveBeenCalled();
	});

	it('x and y range is 0 to 1000', () => {
		const min = 0;
		const max = 1000;

		const errSpy = spyOn(console, 'error');
		for ( let i=min ; i<max ; i++) {
			shallow(
				<Light
					x-min={i}
					x-max={i}
					y-min={i}
					y-max={i}
				/>
			);
		}
		expect(errSpy).not.toHaveBeenCalled();

		const error_min = -1;
		const error_max = 1001;
		errSpy.calls.reset();
		shallow(
			<Light
				x-min={error_min}
				x-max={error_max}
				y-min={error_min}
				y-max={error_max}
			/>
		);
		expect(errSpy).toHaveBeenCalled();

		errSpy.calls.reset();
		const not_number_value = 'not a number';
		shallow(
			<Light
				x-min={not_number_value}
				x-max={not_number_value}
				y-min={not_number_value}
				y-max={not_number_value}
			/>
		);
		expect(errSpy).toHaveBeenCalled();
	});

	it('should be show given color', () => {
		const color = '#FF0000';
		const light = shallow(
			<Light
				color={color}
			/>
		);

		const result = light.find('[data-test="light"]').props().style['backgroundColor'];
		expect(result).toEqual(color);
	});

	it('should be show given size', () => {
		const size = 100;
		const light = shallow(
			<Light
				size={size}
			/>
		);

		const style = light.find('[data-test="light"]').props().style;
		const width = style.width;
		const height = style.height;

		expect(width).toEqual(`${size}px`);
		expect(height).toEqual(`${size}px`);
	});

	it('should be show given alpha with animate', () => {
		const alpha = 0.5;
		let loopCount = 0;
		const onAnimate = jasmine.createSpy(() => loopCount++);
		const light = mount(
			<Light
				alpha={alpha}
				onAnimate={onAnimate}
			/>
		);

		let style = light.find('[data-test="light"]').props().style;
		let result = style.opacity;
		expect(onAnimate).not.toBeCalled();
		expect(result).toEqual(0);

		return new Promise(resolve => {
			setTimeout(resolve, 1000);
		}).then(() => {
			expect(onAnimate).toBeCalled();
			style = light.find('[data-test="light"]').props().style;
			result = style.opacity;
			expect(result).toEqual(alpha);

			light.unmount();
		});
	});

	it('should be show circle shape', () => {
		const light = shallow(
			<Light/>
		);

		const style = light.find('[data-test="light"]').props().style;
		const result = style.borderRadius;

		expect(result).toEqual('50%');
	});
	
	it('Each time animate is called, it must be close to the target', () => {
		const target = {
			x: 100,
			y: 100
		};
		const min = 0;
		const max = 500;
		const repeatCount = 30;
		
		const getPos = () => {
			const style = light.find('[data-test="light"]').props().style;
			const px_filter = /([0-9\.]*)px/i;
			const x = parseInt(px_filter.exec(style.left)[1]);
			const y = parseInt(px_filter.exec(style.top)[1]);
			return {x, y};
		};
		const getDist = (target, pos = getPos()) => ({
			x: Math.abs(target.x*target.x - pos.x*pos.x),
			y: Math.abs(target.y*target.y - pos.y*pos.y)
		});

		let repeat = 0;
		let onAnimate = null;
		const promise = new Promise(resolve => {
			onAnimate = () => {
				if ( repeat < repeatCount ) {
					curDist = getDist(target);
					expect(curDist.x).toBeLessThan(prevDist.x);
					expect(curDist.y).toBeLessThan(prevDist.y);
					repeat++;
				} else {
					resolve();
				}
			};
		});
		
		const light = mount(
			<Light
				onAnimate={onAnimate}
				target-x={target.x}
				target-y={target.y}
				x-min={min}
				y-min={min}
				x-max={max}
				y-max={max}
			/>
		);

		let prevDist = getDist(target);
		let curDist = null;

		promise.then(() => {
			curDist = getDist(target);
			expect(curDist.x).toBeLessThan(prevDist.x);
			expect(curDist.y).toBeLessThan(prevDist.y);
		});

		return promise;
	});
});