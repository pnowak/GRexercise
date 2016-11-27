'use strict';

import get from './../helpers/get';

export const dataFromForm = {
    first_name: '',
    last_name: '',
    textarea_1: '',
    textarea_2: '',
    email: '',
    password: '',
    vid_number: '',
    tickets_count: ''
};

export function saveData(input, data) {
    data[input.name] = input.value;
}

export function saveDataFromForm() {
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
        let item = stored[i];
        
        if (data.hasOwnProperty(item.name)) {
            item.value = localStorage.getItem(item.name);
            saveData(item, dataFromForm);
        }
    }
}