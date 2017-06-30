import { light_created } from '~/actions/Light';
import LightModel from '~/models/LightModel';

function makeAsyncFunc(func, wait) {
	return (...args) => {
		return new Promise(resolve => {
			if ( wait <= 0 ) {
				resolve(func(...args));
			} else {
				window.setTimeout(() => {
					resolve(func(...args));
				}, wait);
			}

		});
	};
}

export class Socket {
	constructor() {
		this.on = makeAsyncFunc(this.on);
	}

	on(event, callback) {
		switch( event ) {
			case 'msg': {
				for ( let i=0 ; i<10 ; i++ ) {
					let model = new LightModel();
					model.toRandomize(500, 500);
					callback(light_created(model));
				}

				break;
			}

			default:
				break;
		}
	}
};

const fakeSocket = (wait = 300) => ({
	on: makeAsyncFunc((event, callback) => {
		switch ( event ) {
			case 'connection': {
				callback(new Socket());
				break;
			}

			default:
				break;
		}
	}, wait)
});

export default fakeSocket;
