const form = document.querySelector('.formtosubmit');
const theName = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.removeEventListener('submit', handleSubmit);

function handleSubmit(e){
    const errorElements = form.querySelectorAll('#thename, #thesurname, #themail, #thepass');
    errorElements.forEach(function(element) {
        element.style.color = "";
        element.textContent = "";
    });

    if(!validateNames(theName)){
        const error = form.querySelector('#thename');
        error.style.color = "red";
        error.textContent = "Enter valid name"

        e.preventDefault();
    }

    if(!validateNames(surname)){
        const error = form.querySelector('#thesurname');
        error.style.color = "red";
        error.textContent = "Enter valid surname"

        e.preventDefault();
    }


    if(!validateEmail(email)){
        const error = form.querySelector('#themail');
        error.style.color = "red";
        error.textContent = "Enter valid email"

        e.preventDefault();
    }


    if(!validatePassword(password)){
        const error = form.querySelector('#thepass');
        error.style.color = "red";
        error.textContent = "Password should be 8-15, atleast 1 lowercase letter, 1 uppercase and 1 special character";

        e.preventDefault();
    }


};

form.addEventListener('submit', handleSubmit);

const validateNames = function(names){ //validate 1st and lst name
    var regname = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if(names.value.match(regname)){
        return true;
    }
    else{
        return false;
    }
}



const validateEmail = function(email){
    var regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(regemail)){
        return true;
    
    }
    else{
        return false;
    }

}

const validatePassword = function(password){
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return regex.test(password.value);
}

const clearInput = function(){
    theName.value = "";
    surname.value = "";
    email.value = "";
    password.value = "";
}

const clearErrorMessages = function(){
    form.querySelector('#thename').textContent = "";
    form.querySelector('#thesurname').textContent = "";
    form.querySelector('#themail').textContent = "";
    form.querySelector('#thepass').textContent = "";
}