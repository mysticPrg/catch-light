import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import LightContainer from './LightContainer';
import LightSpace from '../components/light/LightSpace';
import Light from '../components/light/Light';
import LightModel from '../models/LightModel';
import { fakeStore } from '../utils/common';
import { light_invoke_request } from '../actions/Light';

describe('LightContainer', () => {
	let existLight, state, store, container;
	const actionSpy = jasmine.createSpy();

	beforeEach(() => {
		existLight = new LightModel();
		existLight.toRandomize();

		state = {
			light: {
				lights: new Map([
					[existLight.id, existLight]
				])
			}
		};
		store = fakeStore(state);
		store.dispatch = actionSpy;
		container = mount(
			<Provider store={store}>
				<LightContainer/>
			</Provider>
		);
	});

	afterEach(() => {
		container.unmount();
	});

	it('should be render with store', () => {
		expect(container.find(LightSpace).length).toEqual(1);
		expect(container.find(Light).length).toEqual(state.light.lights.size);
	});

	it('should be clickable', () => {
		container.find(Light).simulate('click');

		expect(actionSpy).toHaveBeenCalledWith(light_invoke_request(existLight.id));
	});
});