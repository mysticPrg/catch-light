/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';

import TextField from '../src/components/neon/TextField';
const neonModule = storiesOf('Neon');
neonModule.add('TextField', () => {

	return (
		<TextField placeholder="Neon TextField"/>
	);

});