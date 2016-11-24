'use strict';

import get from './../helpers/get';

function likePlaceholder() {
    const form = get('form');
	const labels = form.getElementsByTagName('label');
	const arrayLabels = Array.from(labels);
    const arrayForm = Array.from(form);
    
    for (let i = 0; i < arrayForm.length; ++i) { 
        (function (n) { 
            var fn;
            
            for (let j = 0; j < arrayLabels.length; ++j) {
                if (arrayLabels[j].htmlFor === arrayForm[i].name) {
                    
                    (function (label) { 
                        fn = function () {
                            if (this.value === '') {
                                label.style.visibility = 'visible';
                            } else {
                                label.style.visibility = 'hidden';
                            }
                        };
                    }(arrayLabels[j])); 
                    n.addEventListener('click', fn);
                    n.addEventListener('keydown', fn);
                    n.addEventListener('keypress', fn);
                    n.addEventListener('keyup', fn);
                    n.addEventListener('focus', fn);
                    n.addEventListener('focus', focus);
                    n.addEventListener('blur', fn);
                    n.addEventListener('blur', blur);
                }
            }
        }(arrayForm[i]));
    }
};

export default likePlaceholder;