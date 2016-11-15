'use strict';

import get from './../helpers/get';

export function createError(value) {
	const error = get('error');
	const div = document.createElement('div');
	const content = document.createTextNode(value);

	div.appendChild(content);
	error.insertBefore(div, error.firstChild);
}

export function moveErrors() {
	const errorsDivs = document.querySelectorAll('.errors div');
	const errorsArray = Array.from(errorsDivs);

	errorsArray.forEach(function (item, index) {
		item.classList.add('animate');
	});
}

export function	removeErrors() {
	const errorsDivs = document.querySelectorAll('.errors div');
	const errorsArray = Array.from(errorsDivs);

	errorsArray.forEach(function (item, index) {
		item.classList.add('disappear');
	});
}