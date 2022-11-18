import elementsDefinition from './elements-definition.json' assert {type: 'json'};
import books from './books.json' assert {type: 'json'};

const body = document.querySelector('body');
body.classList.add('body');
body.setAttribute('id', 'body');
for (const book of books) {
    const maxDescriptionLength = 150;
    const bookWithShortDescription = { ...book };
    bookWithShortDescription.description = bookWithShortDescription.description.substring(0, maxDescriptionLength) + '...';
    const bookDef = createBookElementDefinition(bookWithShortDescription);
    elementsDefinition[1].children[0].children.push(bookDef); // Update element definition whith available books
}


for (let elementDef of elementsDefinition) {
    body.appendChild(createElementWithChildren(elementDef));
}

// Add Book event listeners
for (const book of books) {
    const bookContainerEl = document.querySelector(`div[book-id=${book.id}]`);
    bookContainerEl.querySelector('.buy-section button:nth-of-type(2)').addEventListener('click', () => showBookDetailsPopup(book));
}

/// Creates DOM elements based on JSON definition.
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

/// Creates JSON Book element definition based on JSON Book model.
function createBookElementDefinition(bookModel) {
    return {
        "tagName": "div",
        "classes": [
            "grid-books"
        ],
        "text": "",
        "attributes": {
            "book-id": bookModel.id
        },
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

/// Shows Book details as a popup.
function showBookDetailsPopup(bookDetails) {
    const popupEl = document.createElement('div');
    popupEl.classList.add('popup');
    const popUpMessage = document.createElement('div');
    popUpMessage.classList.add('popup-message');
    const popUpheader = document.createElement('h2');
    const popUpDescription = document.createElement('p');
    const closeBtn = document.createElement('button');
    popupEl.appendChild(popUpMessage);
    popUpMessage.appendChild(popUpheader);
    popUpMessage.appendChild(popUpDescription);
    popUpMessage.appendChild(closeBtn);
    popUpheader.appendChild(document.createTextNode(bookDetails.title));
    popUpDescription.appendChild(document.createTextNode(bookDetails.description));
    closeBtn.appendChild(document.createTextNode('Close'));
    closeBtn.addEventListener('click', () => popupEl.remove());

    document.querySelector('main').appendChild(popupEl);
}