/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Light from '../src/components/light/Light';
import LightSpace from '../src/components/light/LightSpace';
import { getRandomNumber, getFakeKey } from '../src/utils/common';

const lightModule = storiesOf('Light', module);

lightModule.add('Basic', () => {
	const min = 0;
	const max = 200;

	return (
		<Light
			color="#FF0000"
			alpha="0.5"
			size="20"
			x-min={min}
			x-max={max}
			y-min={min}
			y-max={max}
			onClick={action('click')}
		/>
	);
});

const spaceModule = storiesOf('LightSpace', module);

spaceModule.add('Basic', () => {
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

	const onLightClick = (id) => {
		console.log(id);
		action('click')(id);
	}
	return (
		<LightSpace
			lights={lightArr}
			width={width}
			height={height}
			onLightClick={onLightClick}
		/>
	);
});