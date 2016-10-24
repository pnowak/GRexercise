var validator = {
	types: {},
	config: {},
	errors: 0,
	validate: function( data) {
		var i, type, checker, ok, msg;

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
					msg = 'Niepoprawna wartość ' + i + ' ' + checker.message;
					this.createError(msg);
				}
			}
		}

		if (!this.hasErrors()) {
			saveDataFromForm();
		}
	},
	hasErrors: function() {
		return this.errors !== 0;
	},
	createError(value) {
        var error = get('error'),
        	div = document.createElement('div'),
        	content = document.createTextNode(value);

        div.appendChild(content);
        error.insertBefore(div, error.firstChild);
    }
}

//Typy sprawdzeń
validator.types.isNonEmpty = {
	validate: function (value) {
		return value !== '';
	},
	message: 'wartość nie może być pusta'
}
validator.types.noNumbers = {
	validate: function(value) {
		return value !== '' && !/[^a-zA-Z]+$/.test(value);
	},
	message: 'wartość nie moze być pusta lub być liczbą'
};

validator.types.isNumber = {
	validate: function(value) {
		return value !== '' && !/[^0-9]/i.test(value);
	},
	message: 'wartość nie moze byc pusta oraz musi byc liczba'
};

validator.types.isAlphaNumAndSpec = {
	validate: function(value) {
		return value !== '' && !/[^a-z0-9]/i.test(value);
	},
	message: 'wartość nie może być pusta i musi zawierać co najmniej jedną liczbę, jedną literę i jeden znak specjalny'
};

validator.types.isEmail = {
	validate: function(value) {
		// regex from http://emailregex.com/
		return value !== '' && /.+@.+/i.test(value);
	},
	message: 'wartość nie może być pusta i musi mieć poprawny format email'
};

//Aktualna konfiguracja walidacji
validator.config = {
	first_name: 'noNumbers',
	last_name: 'noNumbers',
	textarea_1: 'isNonEmpty',
	textarea_2: 'isNonEmpty',
	email: 'isEmail',
	password: 'isAlphaNumAndSpec',
	vid_number: 'isNumber',
	tickets_count: 'isNumber'
}

var dataFromForm = {
	first_name: '',
	last_name: '',
	textarea_1: '',
	textarea_2: '',
	email: '',
	password: '',
	vid_number: '',
	tickets_count: ''
};

function saveData(input) {
    dataFromForm[input.name] = input.value;
}

function saveDataFromForm() {
	localStorage.data = JSON.stringify(dataFromForm);
    var data = JSON.parse(localStorage.data),
        prop;
    for (prop in data) {
        if (data.hasOwnProperty(prop)) {
            localStorage.setItem(prop, data[prop]);
        }
    }
}

function likePlaceholder() {
	var form = get('form'),
		stored = Array.prototype.slice.call(form);

	stored.forEach(function (item, index) {
		if (item.type !== 'button') {
			if (item.value === '') {
				item.value  = item.name;
				item.classList.add('show');
			}

			item.addEventListener('focus', function() {
				item.value  = '';
				item.classList.remove('show');
			});

			item.addEventListener('blur', function() {
				if (item.value === '') {
					item.value  = item.name;
					item.classList.add('show');
				}
			});
		}
	});
}

function get(id) {
    return document.getElementById(id);
}

const send = get('send');
const form = get('form');

form.addEventListener('input', function (e) {
  	saveData(e.target);
}, false);

send.addEventListener('click', function (e) {
	validator.validate(dataFromForm);
}, false);

document.addEventListener('DOMContentLoaded', function (e) {
  	likePlaceholder();
}, false);
