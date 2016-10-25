var validator = {
	types: {},
	config: {},
	errors: 0,
	validate: function(data) {
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
					msg = i + ' ' + checker.message;
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
validator.types.max10 = {
	validate: function (value) {
		return /^.{1,10}$/.test(value);
	},
	message: 'wartość nie może być dłuższa niż 10 dowolnych znaków'
}

validator.types.max20 = {
	validate: function (value) {
		return /^.{1,20}$/.test(value);
	},
	message: 'wartość nie może być dłuższa niż 20 dowolnych znaków'
}

validator.types.noNumbers = {
	validate: function(value) {
		return value !== '' && !/[^a-zA-Z]+$/.test(value);
	},
	message: 'wartość nie może być pusta i być liczbą'
};

validator.types.isMax5Number = {
	validate: function(value) {
		return value !== '' && !/[^0-9]{1,5}$/i.test(value); 
	},
	message: 'wartość musi być liczbą max 5 cyfrową'
};

validator.types.isEmail = {
	validate: function(value) {
		// regex from http://emailregex.com/
		return value !== '' && /((.*?)@(.*?).(org|com|pl))/i.test(value);
	},
	message: 'wartość musi mieć poprawny format email'
};

validator.types.isPassword = {
	validate: function(value) {
		return value !== '' && /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/i.test(value);
	},
	message: 'wartość musi zawierać co najmniej 8 znaków, w tym co najmniej jedną liczbę, jedną literę i jeden znak specjalny'
};

validator.types.isRange = {
	validate: function(value) {
		return value !== '' && /^([1-9]|1[0-9]|2[0])$/i.test(value);
	},
	message: 'wartość musi zawierać liczby z zakresu 1-20'
};

//Aktualna konfiguracja walidacji
validator.config = {
	first_name: 'noNumbers',
	last_name: 'noNumbers',
	textarea_1: 'max10',
	textarea_2: 'max20',
	email: 'isEmail',
	password: 'isPassword',
	vid_number: 'isMax5Number',
	tickets_count: 'isRange'
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
  	if (e.target.dataset.max) {
  		//
  	}
}, false);

send.addEventListener('click', function (e) {
	validator.validate(dataFromForm);
}, false);

document.addEventListener('DOMContentLoaded', function (e) {
  	likePlaceholder();
}, false);