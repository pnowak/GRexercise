'use strict';

import get from './../helpers/get';

export function addBalloon(target) {
	const balloon = get('balloon');

	balloon.classList.add('balloon');
  	balloon.textContent = 'Miało być ' + target.dataset.max + ' a jest ' + target.value.length;
}

export function removeBalloon() {
	const balloon = get('balloon');

	balloon.classList.remove('balloon');
  	balloon.textContent = '';
}