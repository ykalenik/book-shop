import elementsDefinition from './elements-definition.json' assert {type: 'json'};
import books from './books.json' assert {type: 'json'};



const body = document.querySelector('body');
body.classList.add('body');
body.setAttribute('id', 'body');
for (let book of books) {
    const bookDef = createBookElementDefinition(book);
    elementsDefinition[1].children[0].children.push(bookDef);
}


for(let elementDef of elementsDefinition) {
    body.appendChild(createElementWithChildren(elementDef));
}

function createElementWithChildren(elementDef) {
    const el = document.createElement(elementDef.tagName);
    if (elementDef.classes.length !== 0) {
        elementDef.classes.forEach(element => el.classList.add(element));
    }
    for (let child of elementDef.children) {
        el.appendChild(createElementWithChildren(child));
    }
    if (elementDef.text.length !== 0) {
        el.appendChild(document.createTextNode(elementDef.text));
    }
    if (Object.keys(elementDef.attributes).length !== 0) {
        for (let [attrName, attrValue] of Object.entries(elementDef.attributes)) {
            el.setAttribute(attrName, attrValue);
        }
    }
    return el;
}

function createBookElementDefinition(bookModel) {
    return                     {
        "tagName": "div",
        "classes": [
            "grid-books"
        ],
        "text": "",
        "attributes": {},
        "children": [
            {
                "tagName": "img",
                "classes": [
                    "grid-image"
                ],
                "text": "",
                "attributes": {
                    "src": bookModel.imageLink,
                    "alt": "Cover of " + bookModel.title
                },
                "children": []
            },
            {
                "tagName": "div",
                "classes": [
                    "book-title"
                ],
                "text": "",
                "attributes": {},
                "children": [
                    {
                        "tagName": "h3",
                        "classes": [],
                        "text": bookModel.title,
                        "attributes": {},
                        "children": []
                    },
                    {
                        "tagName": "h4",
                        "classes": [],
                        "text": bookModel.author,
                        "attributes": {},
                        "children": []
                    }
                ]
            },
            {
                "tagName": "div",
                "classes": [
                    "buy-section"
                ],
                "text": "",
                "attributes": {},
                "children": [
                    {
                        "tagName": "p",
                        "classes": [
                            "price"
                        ],
                        "text": '$' + bookModel.price,
                        "attributes": {},
                        "children": []
                    },
                    {
                        "tagName": "button",
                        "classes": [],
                        "text": "Add to Magic Cart",
                        "attributes": {},
                        "children": [
                            {
                                "tagName": "span",
                                "classes": [],
                                "text": "🛒",
                                "attributes": {},
                                "children": []
                            }
                        ]
                    },
                    {
                        "tagName": "button",
                        "classes": [],
                        "text": "More info",
                        "attributes": {},
                        "children": [
                            {
                                "tagName": "span",
                                "classes": [],
                                "text": "🧙‍♂️",
                                "attributes": {},
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "tagName": "div",
                "classes": [
                    "description"
                ],
                "text": "",
                "attributes": {},
                "children": [
                    {
                        "tagName": "p",
                        "classes": [
                            "description"
                        ],
                        "text": bookModel.description,
                        "attributes": {},
                        "children": []
                    }
                ]
            }
        ]
    }
}