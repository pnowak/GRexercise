'use strict';

import get from './../helpers/get';

export function createError(value) {
	const error = get('error');
	const div = document.createElement('div');
	const content = document.createTextNode(value);

	div.appendChild(content);
	error.appendChild(div, error.firstChild);
}

export function moveErrors() {
	const error = get('error');
	const divs = document.querySelectorAll('.errors div');
	let i = divs.length;

	while (i--) {
		let item = divs[i];

		item.classList.add('animate');
	}
}