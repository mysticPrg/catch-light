/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import backgroundColor from 'react-storybook-decorator-background';

import TextField from '~/components/neon/TextField';
import Button from '~/components/neon/Button';

const neonModule = storiesOf('Neon', module);

neonModule.addDecorator(backgroundColor(['#000000', '#ffffff']));

neonModule.add('TextField', () => {
	const style = {
		width: '250px'
	};

	return (
		<div>
			<TextField placeholder="Neon TextField" style={style}/>
			<TextField placeholder="Neon TextField2">This is TextField</TextField>
		</div>
	);

});

neonModule.add('Button', () => {
	const style = {
		width: '250px'
	};

	return (
		<Button style={style}>This is Button</Button>
	);
});