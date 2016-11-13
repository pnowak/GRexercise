'use strict';

import get from './../helpers/get';

function likePlaceholder() {
	const form = get('form'); console.log(form);
	const stored = Array.from(form);

	stored.forEach(function (item, index) {
		if (item.type !== 'button') {
			if (item.value === '') {
				item.value  = item.name;
				item.classList.add('show');

				if (item.type === 'password') {
					item.type = 'text';
				}
			}

			item.addEventListener('keypress', function() {
				if (item.value  === item.name) {
					item.value  = '';
					item.classList.remove('show');

					if (item.name === 'password') {
						item.type  = 'password';
					}
				}
			});

			item.addEventListener('blur', function() {
				if (item.value === '') {
					item.value  = item.name;
					item.classList.toggle('show');

					if (item.type === 'password') {
						item.type = 'text';
					}
				}
			});
		}
	});
}