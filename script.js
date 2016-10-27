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
				}
			}
		}

		if (!this.hasErrors()) {
			saveDataFromForm();

			balloon.classList.add('balloon');
  			balloon.textContent = 'Wysłano! Dziękujemy.';
		}

		if (!!this.hasErrors()) {
			moveErrors(1000, 900);
		}
	},
	hasErrors: function() {
		return this.errors !== 0;
	},
	createError(value) {
		var error = get('error'),
			div = document.createElement('div'),
			content = document.createTextNode(value); console.log(this);

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
		return (value !== '' && (value.length <= 5) && (value.match(/([0-9])/)));
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
		return ((value !== '') && (value.length >= 8) && (value.match(/([a-zA-Z])/) && value.match(/([0-9])/) && value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)));
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

//Aktualna konfiguracja pol formularza
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
			}

			item.addEventListener('focus', function() {
				item.value  = '';
				item.classList.remove('show');
				removeBalloon();
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

function moveErrors(duration, to) {
	var error = document.querySelector('.errors'),
		divs = document.querySelectorAll('.errors div'),
		frameRate = 1000 / 60,
		perFrame = to / (duration / frameRate),
		lastTime;

	function update(now) {
		divs.forEach(function (item, index) {         
			var heigth = item.clientHeight
				diff = 1; console.log(heigth);

			if (lastTime) {
				diff = (now - lastTime) / frameRate;
			}

			lastTime = now;

			error.style.top = heigth + perFrame + 'px';

			if (parseInt( error.style.top, 10) < to) {
				requestAnimationFrame(update);
			}
		});
	}

	requestAnimationFrame(update);
}

function get(id) {
    return document.getElementById(id);
}

const send = get('send');
const form = get('form');

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

document.addEventListener('DOMContentLoaded', function (e) {
  	likePlaceholder();
}, false);