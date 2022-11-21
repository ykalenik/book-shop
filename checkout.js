const firstNameInputEl = document.querySelector('#firstname');
firstNameInputEl.addEventListener('keyup', () => {
    const errorsEl = document.querySelector('.firstname-validation-erros');
    if (!firstNameInputEl.checkValidity()) {
        errorsEl.textContent = 'Invalid first name - expecting a name to have more than 4 characters (without numbers and special symbols)';
        firstNameInputEl.classList.add('red-border');
    } else {
        errorsEl.textContent = '';
        firstNameInputEl.classList.remove('red-border');
    }
    updatePurchaseBtnState();
});

const surnameInputEl = document.querySelector('#surname');
surnameInputEl.addEventListener('keyup', () => {
    const errorsEl = document.querySelector('.surnamename-validation-erros');
    if (!surnameInputEl.checkValidity()) {
        errorsEl.textContent = 'Invalid surname - should be more than 5 letters and not numbers';
        surnameInputEl.classList.add('red-border');
    } else {
        errorsEl.textContent = '';
        surnameInputEl.classList.remove('red-border');
    }
    updatePurchaseBtnState();
});


const streetInputEl = document.querySelector('#street');
streetInputEl.addEventListener('keyup', () => {
    const errorsEl = document.querySelector('.street-validation-erros');
    if (!streetInputEl.checkValidity()) {
        errorsEl.textContent = 'Invalid street - should be more than 5 letters';
        streetInputEl.classList.add('red-border');
    } else {
        errorsEl.textContent = '';
        streetInputEl.classList.remove('red-border');
    }
    updatePurchaseBtnState();
});

const houseInputEl = document.querySelector('#house-number');
houseInputEl.addEventListener('keyup', () => {
    const errorsEl = document.querySelector('.house-validation-erros');
    if (!houseInputEl.checkValidity()) {
        errorsEl.textContent = 'Invalid house pattern -  expected format 12, 32 and only positive numbers';
        houseInputEl.classList.add('red-border');
    } else {
        errorsEl.textContent = '';
        houseInputEl.classList.remove('red-border');
    }
    updatePurchaseBtnState();
});

const flatInputEl = document.querySelector('#flat-number');
flatInputEl.addEventListener('keyup', () => {
    const errorsEl = document.querySelector('.flat-validation-erros');
    if (!flatInputEl.checkValidity()) {
        errorsEl.textContent = 'Invalid flat pattern - expected format 1-37 or 1 (positive numbers)';
        flatInputEl.classList.add('red-border');
    } else {
        errorsEl.textContent = '';
        flatInputEl.classList.remove('red-border');
    }
    updatePurchaseBtnState();
});


const packInputEl = document.querySelector('#pack');
const postcardInputEl = document.querySelector('#postcard');
const discountInputEl = document.querySelector('#discount');
const brandedGiftInputEl = document.querySelector('#branded-gift');
const giftSection = document.querySelector('.gifts-section');
const giftOptions = [packInputEl, postcardInputEl, discountInputEl, brandedGiftInputEl];
giftOptions.forEach((option) => option.addEventListener('change', () => updatePurchaseBtnState()));


function isValidNumberOfGiftSelected() {
    const giftError = document.querySelector('.gift-validation-error');
    let giftsSelected = 0;
    for (let gift of giftOptions) {
        if (gift.checked) {
            giftsSelected++;
        }
    };
    if (giftsSelected > 2) {
        giftError.textContent = 'Only 2 gifts can be selected!';
    } else {
        giftError.textContent = '';
    }
    return giftsSelected <= 2;
}

function updatePurchaseBtnState() {
    const formEl = document.querySelector('.checkout-form');
    const purchaseBtn = document.querySelector('.purchase-btn');
    if (isValidNumberOfGiftSelected() && formEl.checkValidity()) {
        purchaseBtn.disabled = false;
    } else {
        purchaseBtn.disabled = true;
    }
}

document.querySelector('.purchase-btn').addEventListener('click', () => {
    const orderedBooks = JSON.parse(sessionStorage.getItem('orderedBooks'));
    let orderDetails = '';
    for (const book of orderedBooks) {
        orderDetails += book.title + '\n';
    }
    alert("Thank you, your order is confirmed.\n \nYou've ordered the following books:\n" + orderDetails);
    sessionStorage.clear();
});
