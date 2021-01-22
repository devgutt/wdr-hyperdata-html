'use strict';

import 'regenerator-runtime/runtime';
import render from 'wdr-render-basic';

update();

function update() {
    const dataManager = render.createDataManager({});
    const els = document.querySelectorAll("*[data-hyperdata='1']");
    els.forEach(el => {
        processHyperdata(dataManager, el, el.textContent);
    })
}

function processHyperdata(dataManager, el, str) {
    if (!str.includes('{{')) {
        el.innerHTML = render.textFormatting(str)
    } else {
        el.innerHTML = render.textFormatting(str.replace(/{{[^{}]+}}/g, "..."));
        render.processHyperdata(dataManager, str)
            .then(s => el.innerHTML = render.textFormatting(s))
            .catch(error => {
                console.error(error);
            });
    }
}