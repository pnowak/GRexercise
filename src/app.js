'use strict';

import get from './helpers/get';
import likePlaceholder from './placeholder/likePlaceholder';
import { createError, moveErrors } from './errors/error';
import { addBalloon, removeBalloon } from './balloon/balloon';
import { saveData, saveDataFromForm } from './localeStorage/data';

var validator = {
	types: {},
	config: {},
	errors: 0,
	validate: function(data) {
		var balloon = get('balloon'),
			i, type, checker, ok, msg;

		for (i in data) {
			if (data.hasOwnProperty(i)) {
				type = this.config[i];
				checker = this.types[type];

				if (!checker) {
					throw {
						name: 'ValidateError',
						message: 'Brak obsługi dla klucza ' + type
					}
				}

				ok = checker.validate(data[i]);

				if (!ok) {
					this.errors += 1;
					msg = i + ' ' + checker.message;
					createError(msg);
					moveErrors();
				}
			}
		}

		if (!this.hasErrors()) {
			saveDataFromForm(dataFromForm);

			balloon.classList.add('balloon');
  			balloon.textContent = 'Wysłano! Dziękujemy.';
		}
	},
	hasErrors: function() {
		return this.errors !== 0;
	}
}

//Typy sprawdzeń
validator.types.max10 = {
	validate: function (value) {
		return /^.{1,10}$/.test(value);
	},
	message: 'nie może być dłuższa niż 10 dowolnych znaków'
}

validator.types.max20 = {
	validate: function (value) {
		return /^.{1,20}$/.test(value);
	},
	message: 'nie może być dłuższa niż 20 dowolnych znaków'
}

validator.types.noNumbers = {
	validate: function(value) {
		return value !== '' && !/[^a-zA-Z]+$/.test(value);
	},
	message: 'nie może być pusta i być liczbą'
};

validator.types.isMax5Digits = {
	validate: function(value) {
		return ((value !== '') && (value.length <= 5) && (!isNaN(value)));
	},
	message: 'musi być liczbą max 5 cyfrową'
};

validator.types.isEmail = {
	validate: function(value) {
		// regex from http://emailregex.com/
		return value !== '' && /((.*?)@(.*?).(org|com|pl))/i.test(value);
	},
	message: 'musi mieć poprawny format email'
};

validator.types.isPassword = {
	validate: function(value) {
		return ((value !== '') && (value.length >= 8) && (value.match(/([a-zA-Z])/) && value.match(/([0-9])/) && value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)));
	},
	message: 'musi zawierać co najmniej 8 znaków, w tym co najmniej jedną liczbę, jedną literę i jeden znak specjalny'
};

validator.types.isRange = {
	validate: function(value) {
		return value !== '' && /^([1-9]|1[0-9]|2[0])$/i.test(value);
	},
	message: 'musi zawierać liczby z zakresu 1-20'
};

//Aktualna konfiguracja walidacji
validator.config = {
	first_name: 'noNumbers',
	last_name: 'noNumbers',
	textarea_1: 'max10',
	textarea_2: 'max20',
	email: 'isEmail',
	password: 'isPassword',
	vid_number: 'isMax5Digits',
	tickets_count: 'isRange'
}

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

form.addEventListener('input', function (e) {
	const target = e.target;
	const balloon = get('balloon');

  	saveData(target, dataFromForm);

  	if (target.value.length > target.dataset.max) {
  		addBalloon(target);
  	} else {
  		removeBalloon();
  	}
}, false);

send.addEventListener('click', function validate(e) {
	validator.validate(dataFromForm);
}, false);

document.addEventListener('DOMContentLoaded', likePlaceholder, false);