import elementsDefinition from './elements-definition.json' assert {type: 'json'};
import books from './books.json' assert {type: 'json'};


const PREVOUSLY_ORDERED_BOOKS = sessionStorage.getItem('orderedBooks');
let ORDERED_BOOKS = (PREVOUSLY_ORDERED_BOOKS) ? JSON.parse(PREVOUSLY_ORDERED_BOOKS) : [];
const BODY = document.querySelector('body');

BODY.classList.add('body');
BODY.setAttribute('id', 'body');
for (const book of books) {
    const maxDescriptionLength = 150;
    const bookWithShortDescription = { ...book };
    bookWithShortDescription.description = bookWithShortDescription.description.substring(0, maxDescriptionLength) + '...';
    const bookDef = createBookElementDefinition(bookWithShortDescription);
    elementsDefinition[1].children[0].children.push(bookDef); // Update element definition whith available books
}


for (let elementDef of elementsDefinition) {
    BODY.appendChild(createElementWithChildren(elementDef));
}

// Add Book event listeners
for (const book of books) {
    const bookContainerEl = document.querySelector(`div[book-id=${book.id}]`);
    bookContainerEl.querySelector('.buy-section button:nth-of-type(1)').addEventListener('click', () => addBookToCart(book));
    bookContainerEl.querySelector('.buy-section button:nth-of-type(2)').addEventListener('click', () => showBookDetailsPopup(book));
    bookContainerEl.addEventListener('dragstart', (e) => {
        console.log('drag start!');
        e.dataTransfer.setData("text/plain", JSON.stringify(book));
    });
}
addOrderSectionEventHandlers();

if (PREVOUSLY_ORDERED_BOOKS) showOrderedBooks(ORDERED_BOOKS);

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
            "book-id": bookModel.id,
            "draggable": true
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

function addBookToCart(bookDetails) {
    if (!ORDERED_BOOKS.some((book) => book.id === bookDetails.id)) {
        ORDERED_BOOKS.push(bookDetails);
    } else {
        alert("You've already added this book to cart!");
    }
    showOrderedBooks(ORDERED_BOOKS);
}

function showOrderedBooks(books) {
    const orderSection = document.querySelector('.order');
    orderSection.remove();

    const newOrderSection = document.createElement('section');
    newOrderSection.classList.add('order');
    const newOrderSectionElements = new DocumentFragment();
    const orderSectionHeader = document.createElement('h2');
    orderSectionHeader.appendChild(document.createTextNode('Your order'));
    newOrderSectionElements.appendChild(orderSectionHeader);
    if (books.length === 0) {
        const orderBooksMessageEl = document.createElement('p');
        orderBooksMessageEl.appendChild(document.createTextNode('Please select a book on the left'));
        newOrderSectionElements.appendChild(orderBooksMessageEl);
    } else {
        let totalSum = 0;
        for (const book of books) {
            newOrderSectionElements.appendChild(createOrderedBookElement(book));
            totalSum += book.price;
        }
        const total = document.createElement('p');
        total.appendChild(document.createTextNode(`Total: $${totalSum}`));
        newOrderSectionElements.appendChild(total);
        const submitBtn = document.createElement('button');
        submitBtn.classList.add('confirmBtn');
        submitBtn.appendChild(document.createTextNode('📚 Confirm order'));
        submitBtn.addEventListener('click', () => {
            sessionStorage.setItem("orderedBooks", JSON.stringify(ORDERED_BOOKS));
            const link = document.createElement('a');
            link.setAttribute('href', '/checkout.html');
            link.click();
        });
        newOrderSectionElements.appendChild(submitBtn);
    }
    newOrderSection.appendChild(newOrderSectionElements);
    document.querySelector('main').appendChild(newOrderSection);
    addOrderSectionEventHandlers();
}

function createOrderedBookElement(book) {
    const orderedBooksBox = document.createElement('div');
    orderedBooksBox.classList.add('ordered-books');
    const orderedAuthor = document.createElement('p');
    orderedAuthor.appendChild(document.createTextNode(book.author));
    orderedBooksBox.appendChild(orderedAuthor);
    const orderedTitle = document.createElement('h4');
    orderedTitle.appendChild(document.createTextNode(book.title));
    orderedBooksBox.appendChild(orderedTitle);
    const orderedPrice = document.createElement('p');
    orderedPrice.appendChild(document.createTextNode('$' + book.price));
    orderedBooksBox.appendChild(orderedPrice);
    const orderedImage = document.createElement('img');
    orderedImage.setAttribute('src', book.imageLink);
    orderedImage.setAttribute('alt', book.title);
    orderedImage.classList.add('order-image');
    orderedBooksBox.appendChild(orderedImage);
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode("🗑️ Delete"));
    deleteBtn.addEventListener('click', () => {
        orderedBooksBox.remove();
        ORDERED_BOOKS = ORDERED_BOOKS.filter((orderedBook) => orderedBook.id !== book.id);
        showOrderedBooks(ORDERED_BOOKS);
    });
    orderedBooksBox.appendChild(deleteBtn);
    return orderedBooksBox;
}

function addOrderSectionEventHandlers() {
    const orderSection = document.querySelector('.order');
    orderSection.addEventListener('drop', (e) => {
        console.log('drop!');
        e.stopPropagation(); // Stops some browsers from redirecting.
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        console.log('data', data);
        const bookDetails = JSON.parse(data);
        addBookToCart(bookDetails);
    });
    orderSection.addEventListener('dragover', (e) => {
        e.preventDefault();
        orderSection.classList.add('drag-over');
    });
    orderSection.addEventListener('dragenter', (e) => {
        e.preventDefault();
        orderSection.classList.add('drag-over');
    });
    orderSection.addEventListener('dragleave', (e) => {
        orderSection.classList.remove('drag-over');
    });
}