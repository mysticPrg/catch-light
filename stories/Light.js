/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import backgroundColor from 'react-storybook-decorator-background';

import Light from '~/components/light/Light';
import LightSpace from '~/components/light/LightSpace';
import LightModel from '~/models/LightModel';

const lightModule = storiesOf('Light', module);

lightModule.addDecorator(backgroundColor(['#000000', '#ffffff']));

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

lightModule.add('Space', () => {
	const width = 500;
	const height = 500;
	const count = 30;
	const lightArr = [];
	for ( let i=0 ; i<count ; i++ ) {
		let model = new LightModel();
		model.toRandomize(width, height);
		lightArr.push(model);
	}

	const onLightClick = (id) => {
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