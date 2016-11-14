'use strict';

import get from './helpers/get';
import likePlaceholder from './placeholder/likePlaceholder';
import { createError, moveErrors, removeErrors } from './errors/error';
import { addBalloon, removeBalloon } from './balloon/balloon';
import { saveData, saveDataFromForm, getDataFromLocal } from './localeStorage/data';
import validateForm from './validator/validate';

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

//Aktualna konfiguracja pól formularza
const dataFromForm = {
	first_name: '',
	last_name: '',
	textarea_1: '',
	textarea_2: '',
	email: '',
	password: '',
	vid_number: '',
	tickets_count: ''
};

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

document.addEventListener('DOMContentLoaded', getDataFromLocal, false);
document.addEventListener('load', likePlaceholder, false);