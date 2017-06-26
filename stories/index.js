/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
  
import Hello from '../src/components/Hello';
import { INIT_APP } from '../src/actions/ActionTypes';
storiesOf('MyApp', module).add('Hello', () => <Hello onClick={action(INIT_APP)}/>);

import Light from '../src/components/light/Light';
storiesOf('Light', module).add('Basic', () => {
  const min = 0;
  const max = 200;
  let animate;
  const getAnimateCallback = callback => (animate = callback);

  return (
    <Light
      color="#FF0000"
      alpha="0.5"
      size="20"
      x-min={min}
      x-max={max}
      y-min={min}
      y-max={max}
      getAnimateCallback={getAnimateCallback}
    />
  );

  setInterval(() => {
    if ( animate ) {
      animate();
    }
  }, 500);
});