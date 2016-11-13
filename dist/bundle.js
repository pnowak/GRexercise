/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	var _likePlaceholder = __webpack_require__(2);

	var _likePlaceholder2 = _interopRequireDefault(_likePlaceholder);

	var _error = __webpack_require__(3);

	var _balloon = __webpack_require__(4);

	var _data = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validator = {
		types: {},
		config: {},
		errors: 0,
		validate: function validate(data) {
			var balloon = (0, _get2.default)('balloon'),
			    i,
			    type,
			    checker,
			    ok,
			    msg;

			for (i in data) {
				if (data.hasOwnProperty(i)) {
					type = this.config[i];
					checker = this.types[type];

					if (!checker) {
						throw {
							name: 'ValidateError',
							message: 'Brak obsługi dla klucza ' + type
						};
					}

					ok = checker.validate(data[i]);

					if (!ok) {
						this.errors += 1;
						msg = i + ' ' + checker.message;
						(0, _error.createError)(msg);
						(0, _error.moveErrors)();
					}
				}
			}

			if (!this.hasErrors()) {
				(0, _data.saveDataFromForm)(dataFromForm);

				balloon.classList.add('balloon');
				balloon.textContent = 'Wysłano! Dziękujemy.';
			}
		},
		hasErrors: function hasErrors() {
			return this.errors !== 0;
		}
	};

	//Typy sprawdzeń
	validator.types.max10 = {
		validate: function validate(value) {
			return (/^.{1,10}$/.test(value)
			);
		},
		message: 'nie może być dłuższa niż 10 dowolnych znaków'
	};

	validator.types.max20 = {
		validate: function validate(value) {
			return (/^.{1,20}$/.test(value)
			);
		},
		message: 'nie może być dłuższa niż 20 dowolnych znaków'
	};

	validator.types.noNumbers = {
		validate: function validate(value) {
			return value !== '' && !/[^a-zA-Z]+$/.test(value);
		},
		message: 'nie może być pusta i być liczbą'
	};

	validator.types.isMax5Digits = {
		validate: function validate(value) {
			return value !== '' && value.length <= 5 && !isNaN(value);
		},
		message: 'musi być liczbą max 5 cyfrową'
	};

	validator.types.isEmail = {
		validate: function validate(value) {
			// regex from http://emailregex.com/
			return value !== '' && /((.*?)@(.*?).(org|com|pl))/i.test(value);
		},
		message: 'musi mieć poprawny format email'
	};

	validator.types.isPassword = {
		validate: function validate(value) {
			return value !== '' && value.length >= 8 && value.match(/([a-zA-Z])/) && value.match(/([0-9])/) && value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/);
		},
		message: 'musi zawierać co najmniej 8 znaków, w tym co najmniej jedną liczbę, jedną literę i jeden znak specjalny'
	};

	validator.types.isRange = {
		validate: function validate(value) {
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
	};

	//Aktualna konfiguracja pól formularza
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

	var send = (0, _get2.default)('send');
	var form = (0, _get2.default)('form');

	form.addEventListener('input', function (e) {
		var target = e.target;
		var balloon = (0, _get2.default)('balloon');

		(0, _data.saveData)(target, dataFromForm);

		if (target.value.length > target.dataset.max) {
			(0, _balloon.addBalloon)(target);
		} else {
			(0, _balloon.removeBalloon)();
		}
	}, false);

	send.addEventListener('click', function validate(e) {
		console.log(dataFromForm);
		validator.validate(dataFromForm);
	}, false);

	document.addEventListener('DOMContentLoaded', _likePlaceholder2.default, false);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function get(id) {
	    return document.getElementById(id);
	}

	exports.default = get;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function likePlaceholder() {
		var form = (0, _get2.default)('form');console.log(form);
		var stored = Array.from(form);

		stored.forEach(function (item, index) {
			if (item.type !== 'button') {
				if (item.value === '') {
					item.value = item.name;
					item.classList.add('show');

					if (item.type === 'password') {
						item.type = 'text';
					}
				}

				item.addEventListener('keypress', function () {
					if (item.value === item.name) {
						item.value = '';
						item.classList.remove('show');

						if (item.name === 'password') {
							item.type = 'password';
						}
					}
				});

				item.addEventListener('blur', function () {
					if (item.value === '') {
						item.value = item.name;
						item.classList.toggle('show');

						if (item.type === 'password') {
							item.type = 'text';
						}
					}
				});
			}
		});
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createError = createError;
	exports.moveErrors = moveErrors;

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createError(value) {
		var error = (0, _get2.default)('error');
		var div = document.createElement('div');
		var content = document.createTextNode(value);

		div.appendChild(content);
		error.appendChild(div, error.firstChild);
	}

	function moveErrors() {
		var error = (0, _get2.default)('error');
		var divs = document.querySelectorAll('.errors div');
		var i = divs.length;

		while (i--) {
			var item = divs[i];

			item.classList.add('animate');
		}
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.addBalloon = addBalloon;
	exports.removeBalloon = removeBalloon;

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addBalloon(target) {
		var balloon = (0, _get2.default)('balloon');

		balloon.classList.add('balloon');
		balloon.textContent = 'Miało być ' + target.dataset.max + ' a jest ' + target.value.length;
	}

	function removeBalloon() {
		var balloon = (0, _get2.default)('balloon');

		balloon.classList.remove('balloon');
		balloon.textContent = '';
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.saveData = saveData;
	exports.saveDataFromForm = saveDataFromForm;
	exports.getDataFromLocal = getDataFromLocal;

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function saveData(input, data) {
	    data[input.name] = input.value;
	}

	function saveDataFromForm(dataFromForm) {
	    localStorage.data = JSON.stringify(dataFromForm);

	    var data = JSON.parse(localStorage.data);

	    for (var prop in data) {
	        if (data.hasOwnProperty(prop)) {
	            localStorage.setItem(prop, data[prop]);
	        }
	    }
	}

	function getDataFromLocal() {
	    var data = JSON.parse(localStorage.data);

	    for (var prop in data) {
	        if (data.hasOwnProperty(prop)) {
	            (0, _get2.default)(prop).value = localStorage.getItem(prop);
	        }
	    }
	}

/***/ }
/******/ ]);