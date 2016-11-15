'use strict';

import get from './helpers/get';
import validateForm from './validator/validate';
import likePlaceholder from './placeholder/likePlaceholder';
import { createError, moveErrors, removeErrors } from './errors/error';
import { addBalloon, removeBalloon } from './balloon/balloon';
import * as data from './localeStorage/data';

/*validator.types.isMax5Digits = {
	validate: function(value) {
		return ((value !== '') && (value.length <= 5) && (!isNaN(value)));
	},
	message: 'musi być liczbą max 5 cyfrową'
};

validator.types.isPassword = {
	validate: function(value) {
		return ((value !== '') && (value.length >= 8) && (value.match(/([a-zA-Z])/) && value.match(/([0-9])/) && value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)));
	},
	message: 'musi zawierać co najmniej 8 znaków, w tym co najmniej jedną liczbę, jedną literę i jeden znak specjalny'
};*/

const send = get('send');
const form = get('form');

form.addEventListener('input', function(e) {
	const target = e.target;
	const balloon = get('balloon');

  	data.saveData(target, data.dataFromForm);

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
	likePlaceholder();
	data.getDataFromLocal();
}, false);