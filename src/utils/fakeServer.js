const defaultWait = 1000;

function makeAsyncFunc(func, wait = defaultWait) {
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

function asyncToGenerator(asyncFunc, wait = defaultWait) {
	return function*(...args) {
		const result = yield asyncFunc(...args).then((payload) => payload);
		return result;
	};
}

function funcToGenerator(func, wait = defaultWait) {
	const asyncFunc = makeAsyncFunc(func, wait);
	return asyncToGenerator(asyncFunc, wait);
}

const FakeServer = {
    init_request: funcToGenerator(() => {
        return true;
    })
};

export default FakeServer;