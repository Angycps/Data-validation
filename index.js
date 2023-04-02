// Regex validation
const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const NUMBER_REGEX = /^[0-9]{6,16}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;

//Selectors
const countries = document.querySelector('#countries');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneCode = document.querySelector('#phone_code');
const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm_password');
const formBtn = document.querySelector('#form_btn');
const form = document.querySelector('#form');

//Validations
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;
let countriesValidation = false;

// Function
const validation = (e, validation, element) => {
    const information = e.target.parentElement.children[1];
    formBtn.disabled = !usernameValidation || !emailValidation || !phoneValidation || !passwordValidation || !confirmPasswordValidation || !countriesValidation ? true : false;
    if (validation) {
        element.classList.add('correct');
        element.classList.remove('incorrect');
        information.classList.remove('show_information');
        
    } else {
        element.classList.add('incorrect');
        element.classList.remove('correct');
        information.classList.add('show_information');
    }
}


// Function use

usernameInput.addEventListener('input', e => {
    usernameValidation = USERNAME_REGEX.test(e.target.value);
    validation(e, usernameValidation, usernameInput);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(e, emailValidation, emailInput);
});



// Separate country code from the country name
//Para hacer esto debemos:
//1. convertir el select en un Array, esto se logra con [...elemento a transformar en Array]
//2. Aplicamos un ForEch, es decir "Para cada (opcion..."
//3. seleccionamos el texto de la opcion y con el metodo de las string "split", divido el texto entre el nombre del pais y el codigo +##.
//4. Finalmente selecciono el primer elemento del texto con [0], es decir, el nombre del pais. Y lo igualo a el option.innerHTML, para que eso sea lo unico que muestre el select.

[...countries].forEach(option => {
    option.innerHTML = option.innerHTML.split('(')[0];
});


// Add the country code to the span, color, and validation
countries.addEventListener('input', e => {
    const optionSelected = [...e.target.children].find(option=> option.selected);
    phoneCode.innerHTML = `+${optionSelected.value}`;
    countriesValidation = optionSelected.value == '' ? false : true;
    countries.classList.add('correct');
    phoneCode.classList.add('correct');
    validation(countriesValidation, countries); 
});


phoneInput.addEventListener('input', e => {
    phoneValidation = NUMBER_REGEX.test(e.target.value);
    const information = e.target.parentElement.parentElement.children[1];
    if (phoneValidation) {
        phoneInput.classList.add('correct');
        phoneInput.classList.remove('incorrect');
        information.classList.remove('show_information');
        
    } else {
        phoneInput.classList.add('incorrect');
        phoneInput.classList.remove('correct');
        information.classList.add('show_information');
    }
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    validation(e, passwordValidation, passwordInput);
});

confirmPasswordInput.addEventListener('input', e => {
    confirmPasswordValidation = passwordInput.value === e.target.value;
    validation(e, confirmPasswordValidation, confirmPasswordInput);
});


form.addEventListener('submit', e => {
    e.preventDefault();
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        phone: `${phoneCode.innerHTML} ${phoneInput.value}`,
        password: passwordInput.value, 
    }
console.log(user)
});
