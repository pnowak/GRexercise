'use strict';

import get from './../helpers/get';

export function allPlaceholders() {
    const form = get('form');
    const arrayForm = Array.from(form);
    const labels = form.getElementsByTagName('label');

    for (let i = 0; i < arrayForm.length; i += 1) {
        (function (input) {
            var checkValue;

            for (let j = 0; j < labels.length; j += 1) {
                labels[j].classList.remove('disappear');

                if (labels[j].htmlFor === arrayForm[i].name) {
                    (function (label) {
                        checkValue = function () {
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
    }
};

export function onePlaceholder(target) {
    const label = target.previousElementSibling;          
        
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