'use strict';

import get from './../helpers/get';

function validateForm() {
	const balloon = get('balloon');
	const form = get('form');
	const arrayForm = Array.from(form);

	let filterArray = arrayForm.filter(function (item) {
		return item.dataset.regex;
	});

	filterArray.forEach(function (item, index) {
		let value = item.value;
		let regex = item.dataset.regex;
		let msg = item.dataset.msg;

		if (regex.test(value)) {
			createError(msg);
			moveErrors();
		}
	});

	/*if (!this.hasErrors()) {
		saveDataFromForm();

		balloon.classList.add('balloon');
		balloon.textContent = 'Wysłano! Dziękujemy.';
	}*/
}

export default validateForm;