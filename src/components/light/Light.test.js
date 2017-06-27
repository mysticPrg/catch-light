import React from 'react';
import { shallow, mount } from 'enzyme';

import Light from './Light';
import { getFakeKey, getRandomColor } from '../../utils/common';

jest.useRealTimers();

const timer_margin = 500;

describe('Light', () => {
	it('should be rendered without crash', () => {
		expect(() => {
			shallow(<Light/>);
		}).not.toThrow();
	});

	it('should be clickabled', () => {
		const onClick = jasmine.createSpy();
		const id = getFakeKey();

		const light = shallow(
			<Light
				id={id}
				onClick={onClick}
			/>
		);

		light.simulate('click');

		expect(onClick).toHaveBeenCalledWith(id);
	});

	it.concurrent('should be animated with given fps', () => {
		const fps = 20;
		const onAnimate = jasmine.createSpy();

		const light = mount(
			<Light 
				fps={fps}
				onAnimate={onAnimate}
			/>
		);

		const promise = new Promise(resolve => setTimeout(resolve, 1000 + timer_margin));

		promise.then(() => {
			expect(onAnimate.calls.count()).toBeGreaterThanOrEqual(fps);
			light.unmount();
		});

		return promise;
	});

	it.concurrent('more than 30 must work independently', () => {
		const count = 30;
		const fps = 30;
		const onAnimate = jasmine.createSpy();

		const lightArr = [];
		for (let i=0 ; i<count ; i++ ) {
			lightArr.push(mount(
				<Light
					onAnimate={onAnimate}
					fps={fps}
				/>
			));
		}

		const promise = new Promise(resolve => setTimeout(resolve, 1000 + timer_margin));
		promise.then(() => {
			expect(onAnimate.calls.count()).toBeGreaterThanOrEqual(fps*count);
			for (let i=0 ; i<count ; i++ ) {
				lightArr[i].unmount();
			}
		});

		return promise;
	});
});

describe('Light position', () => {

	beforeEach(() => {
		Light.displayName = Math.random().toString();
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
		const x_pos = parseInt(px_filter.exec(style.left)[1], 10);
		const y_pos = parseInt(px_filter.exec(style.top)[1], 10);

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

	it('y-min should be less than y-max', () => {
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
	
	it.concurrent('Each time animate is called, it must be close to the target', () => {
		const target = {
			x: 100,
			y: 100
		};
		const min = 0;
		const max = 500;
		const repeatCount = 30;
		let light, prevDist, curDist;
		
		const getPos = () => {
			const style = light.find('[data-test="light"]').props().style;
			const px_filter = /([0-9.]*)px/i;
			const x = parseInt(px_filter.exec(style.left)[1], 10);
			const y = parseInt(px_filter.exec(style.top)[1], 10);
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
		
		light = mount(
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

		prevDist = getDist(target);
		curDist = null;

		promise.then(() => {
			curDist = getDist(target);
			expect(curDist.x).toBeLessThan(prevDist.x);
			expect(curDist.y).toBeLessThan(prevDist.y);

			light.unmount();
		});

		return promise;
	});
});

describe('Light shape', () => {
	it('should be show given color', () => {
		const color = getRandomColor();
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

	it.concurrent('should be show given alpha with animate', () => {
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
			setTimeout(resolve, 1000 + timer_margin);
		}).then(() => {
			expect(onAnimate).toBeCalled();
			style = light.find('[data-test="light"]').props().style;
			result = style.opacity;
			expect(result).toEqual(alpha);

			light.unmount();
		});
	});

	it('should be show circle shape', () => {
		const light = shallow(<Light/>);

		const style = light.find('[data-test="light"]').props().style;
		const result = style.borderRadius;

		expect(result).toEqual('50%');
	});

	it('mouse cursor should be change to hand when hover', () => {
		const light = shallow(<Light/>);

		const style = light.find('[data-test="light"]').props().style;
		const result = style.cursor;

		expect(result).toEqual('pointer');
	});
});