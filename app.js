var validator = {
	types: {},
	config: {},
	dataFromForm: {},
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
					this.createError(msg);
					moveErrors();
				}
			}
		}

		if (!this.hasErrors()) {
			saveDataFromForm();

			balloon.classList.add('balloon');
  			balloon.textContent = 'Wysłano! Dziękujemy.';
		}
	},
	hasErrors: function() {
		return this.errors !== 0;
	},
	createError: function(value) {
		var error = get('error'),
			div = document.createElement('div'),
			content = document.createTextNode(value);

		div.appendChild(content);
		error.appendChild(div, error.firstChild);
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
validator.dataFromForm = {
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
    validator.dataFromForm[input.name] = input.value;
}

function saveDataFromForm() {
	localStorage.data = JSON.stringify(validator.dataFromForm);
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

function addBalloon(target) {
	var balloon = get('balloon');

	balloon.classList.add('balloon');
  	balloon.textContent = 'Miało być ' + target.dataset.max + ' a jest ' + target.value.length;
}

function removeBalloon() {
	var balloon = get('balloon');

	balloon.classList.remove('balloon');
  	balloon.textContent = '';
}

function moveErrors() {
	var error = get('error'),
		divs = document.querySelectorAll('.errors div'),
		i = divs.length;

	while (i--) {
		var item = divs[i],
			time = ((10000 * divs.length) / (i + 1)).toFixed(2);

		item.classList.add('animate');
		fadeOut(item, time);
	}

	function fadeOut(el, time) {
		var start = (new Date()).getTime();

		update();

		function update() {
			var elapsed = (new Date()).getTime() - start,
				fraction = elapsed / time,
				opacity;

			if ( fraction < 1) {
				opacity = 1 - Math.sqrt(fraction);
				el.style.opacity = opacity.toFixed(2);

				setTimeout(update, Math.min(25, time - elapsed));
			} else {
				el.style.opacity = 0;
			}
		}
	}
}

function get(id) {
    return document.getElementById(id);
}

var send = get('send');
var form = get('form');

form.addEventListener('input', function (e) {
	var target = e.target,
		balloon = get('balloon');

  	saveData(target);

  	if (target.value.length > target.dataset.max) {
  		addBalloon(target);
  	} else {
  		removeBalloon();
  	}
}, false);

send.addEventListener('click', function (e) {
	validator.validate(validator.dataFromForm);
}, false);

document.addEventListener('DOMContentLoaded', likePlaceholder, false);