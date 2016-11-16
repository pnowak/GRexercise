'use strict';

import get from './../helpers/get';
import { createError, moveErrors } from './../errors/error';
import { saveDataFromForm} from './../localStorage/data';

function validateForm() {
	const balloon = get('balloon');
	const form = get('form');
	const arrayForm = Array.from(form);
	let errorCount = 0; 

	let filterArray = arrayForm.filter(function (item) {
		return item.dataset.regex;
	});

	filterArray.forEach(function (item, index) {
		let value = item.value;
		let name = item.name;
		let regex = item.dataset.regex;
		let msg = item.dataset.msg; console.log(value, name, regex, msg);

		if (value === '' || !(new RegExp(regex).test(value))) {
			errorCount += 1;
			createError(`${name} ${msg}`);
			moveErrors();
		}
	});

	if (errorCount === 0) {
		saveDataFromForm();

		balloon.classList.add('balloon');
		balloon.textContent = 'Wysłano! Dziękujemy.';
	}
}

export default validateForm;