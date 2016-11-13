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

    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            get(prop).value = localStorage.getItem(prop);
        }
    }
}