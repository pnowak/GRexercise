'use strict';

import get from './../helpers/get';

export function saveData(input, data) {
    data[input.name] = input.value;
}

export function saveDataFromForm(dataFromForm) {
	localStorage.data = JSON.stringify(dataFromForm);

    let data = JSON.parse(localStorage.data);

    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            localStorage.setItem(prop, data[prop]);
        }
    }
}

export function getDataFromLocal() {
    const data = JSON.parse(localStorage.data);
    const form = get('form');
    const stored = Array.from(form);

    for (let i = 0; i < stored.length; i += 1) {
        if (data.hasOwnProperty(stored[i].name)) {
            stored[i].value = localStorage.getItem(stored[i].name);
        }
    }
}