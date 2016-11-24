'use strict';

import get from './helpers/get';
import validateForm from './validator/validate';
import likePlaceholder from './placeholder/likePlaceholder';
import { createError, moveErrors, removeErrors } from './errors/error';
import { addBalloon, removeBalloon } from './balloon/balloon';
import { saveData, dataFromForm, getDataFromLocal } from './localStorage/data';

const send = get('send');
const form = get('form');

form.addEventListener('input', function(e) {
	const target = e.target;
	const balloon = get('balloon');

  	saveData(target, dataFromForm);

  	if (target.value.length > target.dataset.max) {
  		addBalloon(target);
  	} else {
  		removeBalloon();
  	}
}, false);

send.addEventListener('click', function(e) {
	removeErrors();
	validateForm();
}, false);

document.addEventListener('DOMContentLoaded', function(e) {
	if (localStorage.getItem('first_name') === '') {
		likePlaceholder();
	} else {
		getDataFromLocal();
	}
}, false);