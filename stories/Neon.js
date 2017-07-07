/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import backgroundColor from 'react-storybook-decorator-background';

// import TextField from '~/components/neon/TextField';
// import Button from '~/components/neon/Button';
import { TextField, Button } from '~/components/neon';

console.log(Button)

const neonModule = storiesOf('Neon', module);

neonModule.addDecorator(backgroundColor(['#000000', '#ffffff']));

neonModule.add('TextField', () => {
	return (
		<div>
			<TextField placeholder="Neon TextField"/>
			<TextField placeholder="Neon TextField2" defaultValue="This is default value"/>
		</div>
	);

});

neonModule.add('Button', () => {
	return (
		<Button>This is Button</Button>
	);
});