'use strict';

import get from './../helpers/get';

function likePlaceholder() {
	const form = get('form');
	const arrayForm = Array.from(form);
	const labels = form.getElementsByTagName('label'); console.log(arrayForm, labels);

	for (let i = 0; i < labels.length; i += 1) {
		let item = labels[i];
	}

	arrayForm.forEach(function (item, index) {
		if (item.type !== 'button') {
			
			item.addEventListener('click', function(e) {
				checkValue(item);
			});
            item.addEventListener('keydown', function(e) {
				checkValue(item);
			});
            item.addEventListener('keypress', function(e) {
				checkValue(item);
			});
            item.addEventListener('keyup', function(e) {
				checkValue(item);
			});
            item.addEventListener('focus', function(e) {
				checkValue(item);
			});
            item.addEventListener('blur', function(e) {
				checkValue(item);
			});
		}
	});
}

function checkValue(item) {
	if (item.value === '') {
		item.classList.add('show');
    } else {
        item.classList.add('disappear')
    }
}

export default likePlaceholder;