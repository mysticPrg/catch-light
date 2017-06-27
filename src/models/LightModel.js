import { 
	getRandomNumber,
	getFakeKey,
	getRandomColor,
} from '../utils/common';

export default class LightModel {
	constructor({
		id = 0,
		color = '#000000',
		size = 10,
		alpha = 1.0,
		speed = 1.0,
		target_x = 0,
		target_y = 0,
		invoked = false
	} = {}
	) {
		this.id = id;
		this.color = color;
		this.size = size;
		this.alpha = alpha;
		this.speed = speed;
		this['target-x'] = target_x;
		this['target-y'] = target_y;
		this.invoked = invoked;
	}

	toRandomize(width = 500, height = 500) {
		this.id = getFakeKey();
		this.color = getRandomColor();
		this.size = getRandomNumber(10, 50);
		this.alpha = Math.random();
		this.speed = Math.random();
		this['target-x'] = getRandomNumber(0, width);
		this['target-y'] = getRandomNumber(0, height);
	}
};