'use strict';

import get from './../helpers/get';

function likePlaceholder() {
    const form = get('form');
    const arrayForm = Array.from(form);
    const labels = form.getElementsByTagName('label');
    const arrayLabels = Array.from(labels);

    for (let i = 0; i < arrayForm.length; i += 1) {
        (function (input) {
            var checkValue;

            for (let j = 0; j < arrayLabels.length; j += 1) {

                if (arrayLabels[j].htmlFor === arrayForm[i].name) {
                    arrayLabels[j].classList.remove('disappear');

                    (function (label) {
                        checkValue = function () {
                            if (this.value === '') {
                                label.style.visibility = 'visible';
                            } else {
                                label.style.visibility = 'hidden';
                            }
                        };
                    }(arrayLabels[j]));

                    input.addEventListener('click', checkValue);
                    input.addEventListener('keydown', checkValue);
                    input.addEventListener('keypress', checkValue);
                    input.addEventListener('keyup', checkValue);
                    input.addEventListener('focus', checkValue);
                    input.addEventListener('blur', checkValue);
                }
            }
        }(arrayForm[i]));
    }
};

export default likePlaceholder;