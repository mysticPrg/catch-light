/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Light from '../src/components/light/Light';
storiesOf('Light', module).add('Basic', () => {
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