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

	var _validate = __webpack_require__(2);

	var _validate2 = _interopRequireDefault(_validate);

	var _likePlaceholder = __webpack_require__(5);

	var _error = __webpack_require__(3);

	var _balloon = __webpack_require__(6);

	var _data = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var send = (0, _get2.default)('send');
	var form = (0, _get2.default)('form');

	form.addEventListener('input', function (e) {
	  var target = e.target;
	  var balloon = (0, _get2.default)('balloon');

	  (0, _data.saveData)(target, _data.dataFromForm);

	  if (target.value.length === 0) {
	    (0, _likePlaceholder.onePlaceholder)(target);
	  }

	  if (target.value.length > target.dataset.max) {
	    (0, _balloon.addBalloon)(target);
	  } else {
	    (0, _balloon.removeBalloon)();
	  }
	}, false);

	send.addEventListener('click', function (e) {
	  (0, _error.removeErrors)();
	  (0, _validate2.default)();
	}, false);

	document.addEventListener('DOMContentLoaded', function (e) {
	  localStorage.first_name !== '' && localStorage.getItem('first_name') !== null ? (0, _data.getDataFromLocal)() : (0, _likePlaceholder.allPlaceholders)();
	}, false);

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

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	var _error = __webpack_require__(3);

	var _data = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validateForm() {
		var balloon = (0, _get2.default)('balloon');
		var form = (0, _get2.default)('form');
		var arrayForm = Array.from(form);
		var errorCount = 0;

		var filterArray = arrayForm.filter(function (item) {
			return item.dataset.regex;
		});

		filterArray.forEach(function (item, index) {
			var value = item.value;
			var name = item.name;
			var regex = item.dataset.regex;
			var msg = item.dataset.msg;

			if (!new RegExp(regex).test(value)) {
				errorCount += 1;
				(0, _error.createError)(name + ' ' + msg);
				(0, _error.moveErrors)();
			}
		});

		if (errorCount === 0) {
			(0, _data.saveDataFromForm)();

			balloon.classList.add('balloon');
			balloon.textContent = 'Wysłano! Dziękujemy.';
		}
	}

	exports.default = validateForm;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createError = createError;
	exports.moveErrors = moveErrors;
	exports.removeErrors = removeErrors;

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createError(value) {
		var error = (0, _get2.default)('error');
		var div = document.createElement('div');
		var content = document.createTextNode(value);

		div.appendChild(content);
		error.insertBefore(div, error.firstChild);
	}

	function moveErrors() {
		var errorsDivs = document.querySelectorAll('.errors div');
		var errorsArray = Array.from(errorsDivs);

		errorsArray.forEach(function (item, index) {
			item.classList.add('animate');
		});
	}

	function removeErrors() {
		var errorsDivs = document.querySelectorAll('.errors div');
		var errorsArray = Array.from(errorsDivs);

		errorsArray.forEach(function (item, index) {
			item.classList.add('disappear');
		});
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.dataFromForm = undefined;
	exports.saveData = saveData;
	exports.saveDataFromForm = saveDataFromForm;
	exports.getDataFromLocal = getDataFromLocal;

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dataFromForm = exports.dataFromForm = {
	    first_name: '',
	    last_name: '',
	    textarea_1: '',
	    textarea_2: '',
	    email: '',
	    password: '',
	    vid_number: '',
	    tickets_count: ''
	};

	function saveData(input, data) {
	    data[input.name] = input.value;
	}

	function saveDataFromForm() {
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
	    var form = (0, _get2.default)('form');
	    var stored = Array.from(form);

	    for (var i = 0; i < stored.length; i += 1) {
	        var item = stored[i];

	        if (data.hasOwnProperty(item.name)) {
	            item.value = localStorage.getItem(item.name);
	            saveData(item, dataFromForm);
	        }
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.allPlaceholders = allPlaceholders;
	exports.onePlaceholder = onePlaceholder;

	var _get = __webpack_require__(1);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function allPlaceholders() {
	    var form = (0, _get2.default)('form');
	    var arrayForm = Array.from(form);
	    var labels = form.getElementsByTagName('label');

	    var _loop = function _loop(i) {
	        (function (input) {
	            var checkValue;

	            for (var j = 0; j < labels.length; j += 1) {
	                labels[j].classList.remove('disappear');

	                if (labels[j].htmlFor === arrayForm[i].name) {
	                    (function (label) {
	                        checkValue = function checkValue() {
	                            if (this.value === '') {
	                                label.classList.remove('disappear');
	                            } else {
	                                label.classList.add('disappear');
	                            }
	                        };
	                    })(labels[j]);

	                    input.addEventListener('click', checkValue);
	                    input.addEventListener('keydown', checkValue);
	                    input.addEventListener('keypress', checkValue);
	                    input.addEventListener('keyup', checkValue);
	                    input.addEventListener('focus', checkValue);
	                    input.addEventListener('blur', checkValue);
	                }
	            }
	        })(arrayForm[i]);
	    };

	    for (var i = 0; i < arrayForm.length; i += 1) {
	        _loop(i);
	    }
	};

	function onePlaceholder(target) {
	    var label = target.previousElementSibling;

	    target.addEventListener('click', checkValue);
	    target.addEventListener('keydown', checkValue);
	    target.addEventListener('keypress', checkValue);
	    target.addEventListener('keyup', checkValue);
	    target.addEventListener('focus', checkValue);
	    target.addEventListener('blur', checkValue);

	    function checkValue() {
	        if (this.value === '') {
	            label.classList.remove('disappear');
	        } else {
	            label.classList.add('disappear');
	        }
	    }
	};

/***/ },
/* 6 */
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

/***/ }
/******/ ]);