import elementsDefinition from './elements-definition.json' assert {type: 'json'};


const body = document.querySelector('body');
body.classList.add('body');
for(let elementDef of elementsDefinition) {
    body.appendChild(createElementWithChildren(elementDef));
}

function createElementWithChildren(elementDef) {
    const el = document.createElement(elementDef.tagName);
    if (elementDef.classes.length !== 0) {
        elementDef.classes.forEach(element => el.classList.add(element));
    }
    if (elementDef.text.length !== 0) {
        el.appendChild(document.createTextNode(elementDef.text));
    }
    if (Object.keys(elementDef.attributes).length !== 0) {
        for (let [attrName, attrValue] of Object.entries(elementDef.attributes)) {
            el.setAttribute(attrName, attrValue);
        }
    }
    for (let child of elementDef.children) {
        el.appendChild(createElementWithChildren(child));
    }
    return el;
}
