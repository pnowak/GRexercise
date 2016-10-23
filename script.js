var validator = {
	types: {},
	config: {},
	errors: 0,
	validate: function( data) {
		var i, type, checker, result, msg;

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

				result = checker.validate(data[i]);

				if (!result) {
					this.errors += 1;
					msg = 'Niepoprawna wartość ' + i + ' ' + checker.message;
					this.createError(msg);
				}
			}
		}

		if (!this.hasErrors) {
			saveForm();
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
validator.types.noNumbers = {
	validate: function(value) {
		return value !== '' && /[^a-zA-Z]+$/.test(value);
	},
	message: 'wartość nie moze być pusta lub liczba'
};

validator.types.isNumber = {
	validate: function(value) {
		return value !== '' && /[^0-9]/i.test(value);
	},
	message: 'wartość nie moze byc pusta oraz musi byc liczba'
};

validator.types.isAlphaNumAndSpec = {
	validate: function(value) {
		return value !== '' && !/[^a-z0-9]/i.test(value);
	},
	message: 'wartość nie może być pusta i musi zawierać co najmniej jedną liczbę, jedną literę i jeden znak specjalny'
};

//Aktualna konfiguracja walidacji
validator.config = {
	first_name: 'noNumbers',
	last_name: 'noNumbers',
	textarea_1: 'isAlphaNumAndSpec',
	textarea_2: 'isAlphaNumAndSpec',
	email: 'isAlphaNumAndSpec',
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

function saveForm() {  
    for (const input of inputs) {
        localStorage.setItem(input.name, input.value);
    }
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


























